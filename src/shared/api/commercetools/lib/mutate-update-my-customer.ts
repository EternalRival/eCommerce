import { z } from 'zod';

import { $http } from '../model';

import type { CountryCode, Locale } from '../model';

const document = `
mutation UpdateMyCustomer($version: Long!, $actions: [MyCustomerUpdateAction!]!) {
  updateMyCustomer(version: $version, actions: $actions) {
    id
    email
  }
}
`;

const updateMyCustomerSchema = z
  .object({
    updateMyCustomer: z.object({
      id: z.string(),
      email: z.string(),
    }),
  })
  .transform((data) => data.updateMyCustomer);

type AddressInput = {
  country: CountryCode;
  postalCode?: string;
  city?: string;
  streetName?: string;
};

type AddressIdOrKey = { addressId: string } | { addressKey: string };

type MyCustomerUpdateAction =
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

export type MutateUpdateMyCustomerReturn = z.infer<typeof updateMyCustomerSchema>;
export async function mutateUpdateMyCustomer(
  token: string,
  { version, actions }: { version: number; actions: MyCustomerUpdateAction[] }
): Promise<MutateUpdateMyCustomerReturn> {
  return $http
    .gql(token, {
      operationName: 'UpdateMyCustomer',
      query: document,
      variables: { version, actions },
    })
    .then((data) => updateMyCustomerSchema.parse(data));
}
