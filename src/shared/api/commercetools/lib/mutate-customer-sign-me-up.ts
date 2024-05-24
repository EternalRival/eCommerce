import { z } from 'zod';

import { $http } from '../model';

import type { CountryCode } from '../model';

const document = `
mutation CustomerSignMeUp($draft: CustomerSignMeUpDraft!) {
  customerSignMeUp(draft: $draft) {
    customer {
      id
      email
    }
  }
}
`;

const customerSignMeUpSchema = z
  .object({
    customerSignMeUp: z.object({
      customer: z.object({
        id: z.string(),
        email: z.string(),
      }),
    }),
  })
  .transform((data) => data.customerSignMeUp);

type Draft = {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: {
    country: CountryCode;
    postalCode?: string;
    city?: string;
    streetName?: string;
  }[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  shippingAddresses?: number[];
  billingAddresses?: number[];
};

export type MutateCustomerSignMeUpReturn = z.infer<typeof customerSignMeUpSchema>;

export async function mutateCustomerSignMeUp(token: string, draft: Draft): Promise<MutateCustomerSignMeUpReturn> {
  return $http
    .gql(token, {
      operationName: 'CustomerSignMeUp',
      query: document,
      variables: { draft },
    })
    .then((data) => customerSignMeUpSchema.parse(data));
}
