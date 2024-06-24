import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { $http, countryCodeSchema } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { UseQueryResult } from '@tanstack/react-query';

const operationName = QueryKey.CUSTOMER;

const query = `
query ${operationName}{
  me {
    customer {
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

export type QueryCustomerReturn = z.infer<typeof customerSchema>;

async function queryCustomer({ token }: { token: Maybe<string> }): Promise<QueryCustomerReturn> {
  return $http.gql({ token, operationName, query }).then((data) => customerSchema.parse(data));
}

export function useCustomerQuery({
  token,
  enabled,
}: {
  token: Maybe<string>;
  enabled?: boolean;
}): UseQueryResult<QueryCustomerReturn> {
  return useQuery({
    queryKey: [operationName, token],
    queryFn() {
      return queryCustomer({ token });
    },
    enabled,
  });
}
