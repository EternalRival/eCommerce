import { z } from 'zod';

import { $http, countryCodeSchema } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

const operationName = QueryKey.CUSTOMER;

const query = `
query ${operationName}{
  me {
    customer {
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
}
`;

const customerSchema = z.object({
  me: z
    .object({
      customer: z.object({
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
      }),
    })
    .nullish(),
});

export type GetCustomerReturn = z.infer<typeof customerSchema>;

export async function getCustomer({ token }: { token: Maybe<string> }): Promise<GetCustomerReturn> {
  return $http.gql({ token, operationName, query }).then((data) => customerSchema.parse(data));
}
