import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerStore } from '~/entities/customer-store';
import {
  findCountryByLabel,
  getTokenInfo,
  getTokenInfoByCredentials,
  signInCustomer,
  signUpCustomer,
  updateCustomer,
} from '~/shared/api/commercetools';
import { toastifyError } from '~/shared/lib/react-toastify';

import type { AuthStateByType } from '~/entities/auth-store';
import type { Customer, CustomerSignInResult, MyCustomerDraft, UpdateCustomerDto } from '~/shared/api/commercetools';
import type { SignUpDto } from '../model';

type UseSignUpMutationReturn = {
  isPending: boolean;
  signUp: (signUpDto: SignUpDto) => void;
};

type MutationFnReturn = [Omit<AuthStateByType<'customer'>, 'type'>, CustomerSignInResult];

function createMyCustomerDraft(signUpDto: SignUpDto): MyCustomerDraft {
  const { email, password, dateOfBirth, firstName, lastName, isSingleAddressMode } = signUpDto;
  const myCustomerDraft: MyCustomerDraft & Required<Pick<MyCustomerDraft, 'addresses'>> = {
    ...{ email, password, dateOfBirth, firstName, lastName },
    addresses: [
      {
        country: findCountryByLabel(signUpDto.shippingCountry).code,
        postalCode: signUpDto.shippingPostalCode,
        city: signUpDto.shippingCity,
        streetName: signUpDto.shippingStreet,
      },
    ],
  };

  if (!isSingleAddressMode) {
    myCustomerDraft.addresses.push({
      country: findCountryByLabel(signUpDto.billingCountry).code,
      postalCode: signUpDto.billingPostalCode,
      city: signUpDto.billingCity,
      streetName: signUpDto.billingStreet,
    });
  }

  return myCustomerDraft;
}

function createUpdateCustomerDto(
  { addresses, version }: Customer,
  { isSingleAddressMode, shippingIsDefault, billingIsDefault }: SignUpDto
): UpdateCustomerDto {
  const shippingAddressId = addresses[0]?.id;
  const billingAddressId = isSingleAddressMode ? shippingAddressId : addresses[1]?.id;

  const updateCustomerDto: UpdateCustomerDto = {
    version,
    actions: [
      { action: 'addShippingAddressId', addressId: shippingAddressId },
      { action: 'addBillingAddressId', addressId: billingAddressId },
    ],
  };

  if (shippingIsDefault) {
    updateCustomerDto.actions.push({ action: 'setDefaultShippingAddress', addressId: shippingAddressId });
  }

  if (billingIsDefault) {
    updateCustomerDto.actions.push({ action: 'setDefaultBillingAddress', addressId: billingAddressId });
  }

  return updateCustomerDto;
}

export function useSignUpMutation(): UseSignUpMutationReturn {
  const authStore = useAuthStore((store) => store);
  const customerStore = useCustomerStore((store) => store);

  const { isPending, mutate } = useMutation<MutationFnReturn, Error, SignUpDto>({
    async mutationFn(signUpDto) {
      // get guest token
      const guestToken = authStore.type === 'guest' ? authStore : await getTokenInfo();

      // signup new customer
      const signUpResult = await signUpCustomer(guestToken.access_token, createMyCustomerDraft(signUpDto));

      // get his token
      const customerToken = await getTokenInfoByCredentials({
        username: signUpDto.email,
        password: signUpDto.password,
      });

      // set addresses
      await updateCustomer(customerToken.access_token, createUpdateCustomerDto(signUpResult.customer, signUpDto));

      // get his data
      const signInResult = await signInCustomer(customerToken.access_token, signUpDto);

      return [customerToken, signInResult];
    },
    async onSuccess([customerToken, signInResult]) {
      toast.success('Successful sign up');
      authStore.setCustomerToken(customerToken);
      customerStore.setCustomer(signInResult.customer);
    },
    onError: toastifyError,
  });

  return { isPending, signUp: (signUpDto) => void mutate(signUpDto) };
}
