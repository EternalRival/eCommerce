import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { CountryCode, Locale } from '~/shared/api/commercetools';

const operationName = QueryKey.CUSTOMER_UPDATE;

const query = `
mutation ${operationName}($version: Long!, $actions: [MyCustomerUpdateAction!]!) {
  updateMyCustomer(version: $version, actions: $actions) {
    id
    email
  }
}
`;

const customerUpdateSchema = z.object({
  updateMyCustomer: z.object({
    id: z.string(),
    email: z.string(),
  }),
});

type MutateCustomerUpdateReturn = z.infer<typeof customerUpdateSchema>;

type AddressInput = {
  country: CountryCode;
  postalCode?: string;
  city?: string;
  streetName?: string;
};

type AddressIdOrKey = { addressId: string } | { addressKey: string };

export type MyCustomerUpdateAction =
  | { setLocale: { locale?: Locale } }
  | { changeEmail: { email: string } }
  | { setFirstName: { firstName?: string } }
  | { setLastName: { lastName?: string } }
  | { setDateOfBirth: { dateOfBirth?: string } }
  | { addAddress: { address: AddressInput } }
  | { changeAddress: AddressIdOrKey & { address: AddressInput } }
  | { removeAddress: AddressIdOrKey }
  | { addBillingAddressId: AddressIdOrKey }
  | { removeBillingAddressId: AddressIdOrKey }
  | { setDefaultBillingAddress: AddressIdOrKey }
  | { addShippingAddressId: AddressIdOrKey }
  | { removeShippingAddressId: AddressIdOrKey }
  | { setDefaultShippingAddress: AddressIdOrKey };

type UpdateDto = {
  token: Maybe<string>;
  variables: {
    version: number;
    actions: MyCustomerUpdateAction[];
  };
};

async function mutateCustomerUpdate({ token, variables }: UpdateDto): Promise<MutateCustomerUpdateReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => customerUpdateSchema.parse(data));
}

type UseCustomerUpdateMutationOptions = UseMutationOptions<MutateCustomerUpdateReturn, Error, UpdateDto>;

type UseCustomerUpdateMutationResult = UseMutationResult<MutateCustomerUpdateReturn, Error, UpdateDto>;

export function useCustomerUpdateMutation(
  options: Omit<UseCustomerUpdateMutationOptions, 'mutationFn'> = {}
): UseCustomerUpdateMutationResult {
  return useMutation({ mutationFn: mutateCustomerUpdate, ...options });
}
