import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerStore } from '~/entities/customer-store';
import {
  findCountryByLabel,
  getTokenInfo,
  getTokenInfoByCredentials,
  mutateCustomerSignMeIn,
  mutateCustomerSignMeUp,
} from '~/shared/api/commercetools';
import { toastifyError } from '~/shared/lib/react-toastify';

import type { AuthStateByType } from '~/entities/auth-store';
import type { MutateCustomerSignMeInReturn } from '~/shared/api/commercetools';
import type { SignUpDto } from '../model';

type UseSignUpMutationReturn = {
  isPending: boolean;
  signUp: (signUpDto: SignUpDto) => void;
};

type MutationFnReturn = [Omit<AuthStateByType<'customer'>, 'type'>, MutateCustomerSignMeInReturn];

type CustomerSignMeUpDraft = Parameters<typeof mutateCustomerSignMeUp>[1];

function createCustomerSignMeUpDraft({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  ...addresses
}: SignUpDto): CustomerSignMeUpDraft {
  const [shippingAddressIndex, billingAddressIndex] = [0, addresses.isSingleAddressMode ? 0 : 1];

  const customerSignMeUpDraft: CustomerSignMeUpDraft & Required<Pick<CustomerSignMeUpDraft, 'addresses'>> = {
    ...{ email, password, firstName, lastName, dateOfBirth },
    addresses: [
      {
        country: findCountryByLabel(addresses.shippingCountry).code,
        postalCode: addresses.shippingPostalCode,
        city: addresses.shippingCity,
        streetName: addresses.shippingStreet,
      },
    ],
    shippingAddresses: [shippingAddressIndex],
    billingAddresses: [billingAddressIndex],
  };

  if (!addresses.isSingleAddressMode) {
    customerSignMeUpDraft.addresses.push({
      country: findCountryByLabel(addresses.billingCountry).code,
      postalCode: addresses.billingPostalCode,
      city: addresses.billingCity,
      streetName: addresses.billingStreet,
    });
  }

  if (addresses.shippingIsDefault) {
    customerSignMeUpDraft.defaultShippingAddress = shippingAddressIndex;
  }

  if (addresses.billingIsDefault) {
    customerSignMeUpDraft.defaultBillingAddress = billingAddressIndex;
  }

  return customerSignMeUpDraft;
}

export function useSignUpMutation(): UseSignUpMutationReturn {
  const authStore = useAuthStore((store) => store);
  const customerStore = useCustomerStore((store) => store);

  const { isPending, mutate } = useMutation<MutationFnReturn, Error, SignUpDto>({
    async mutationFn(signUpDto) {
      const { email, password } = signUpDto;

      // get guest token
      const guestToken = authStore.type === 'guest' ? authStore : await getTokenInfo();

      // signup new customer
      await mutateCustomerSignMeUp(guestToken.access_token, createCustomerSignMeUpDraft(signUpDto));

      // get his token
      const customerToken = await getTokenInfoByCredentials({ username: email, password });

      // get his data
      const customerSignMeInResult = await mutateCustomerSignMeIn(customerToken.access_token, { email, password });

      return [customerToken, customerSignMeInResult];
    },
    async onSuccess([customerToken, customerSignMeInResult]) {
      toast.success('Successful sign up');
      authStore.setCustomerToken(customerToken);
      customerStore.setCustomer(customerSignMeInResult.customer);
    },
    onError: toastifyError,
  });

  return { isPending, signUp: (signUpDto) => void mutate(signUpDto) };
}
