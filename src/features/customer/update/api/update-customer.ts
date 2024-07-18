import { z } from 'zod';

import { $http, countryCodeSchema } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { CountryCode, Locale } from '~/shared/api/commercetools';

const operationName = QueryKey.CUSTOMER_UPDATE;

const query = `
mutation ${operationName}($version: Long!, $actions: [MyCustomerUpdateAction!]!) {
  updateMyCustomer(version: $version, actions: $actions) {
    id
    email
    version
    firstName
    lastName
    dateOfBirth
    addresses {
      id
      country
      postalCode
      city
      streetName
    }
    billingAddressIds
    defaultBillingAddressId
    shippingAddressIds
    defaultShippingAddressId
  }
}
`;

const updateCustomerSchema = z.object({
  updateMyCustomer: z
    .object({
      id: z.string(),
      email: z.string(),
      version: z.number(),
      firstName: z.string().nullish(),
      lastName: z.string().nullish(),
      dateOfBirth: z.string().nullish(),
      addresses: z.array(
        z.object({
          id: z.string().nullish(),
          country: countryCodeSchema,
          postalCode: z.string().nullish(),
          city: z.string().nullish(),
          streetName: z.string().nullish(),
        })
      ),
      billingAddressIds: z.array(z.string()),
      defaultBillingAddressId: z.string().nullish(),
      shippingAddressIds: z.array(z.string()),
      defaultShippingAddressId: z.string().nullish(),
    })
    .nullish(),
});

type UpdateCustomerReturn = z.infer<typeof updateCustomerSchema>;

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

export async function updateCustomer({ token, variables }: UpdateDto): Promise<UpdateCustomerReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => updateCustomerSchema.parse(data));
}
