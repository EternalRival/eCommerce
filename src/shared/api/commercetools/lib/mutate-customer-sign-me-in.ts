import { z } from 'zod';

import { $http } from '../model';

const document = `
mutation CustomerSignMeIn($draft: CustomerSignMeInDraft!) {
  customerSignMeIn(draft: $draft) {
    customer {
      id
      email
    }
  }
}
`;

const customerSignMeInSchema = z
  .object({
    customerSignMeIn: z.object({
      customer: z.object({
        id: z.string(),
        email: z.string(),
      }),
    }),
  })
  .transform((data) => data.customerSignMeIn);

type Draft = {
  email: string;
  password: string;
};

export type MutateCustomerSignMeInReturn = z.infer<typeof customerSignMeInSchema>;

export async function mutateCustomerSignMeIn(token: string, draft: Draft): Promise<MutateCustomerSignMeInReturn> {
  return $http
    .gql(token, {
      operationName: 'CustomerSignMeIn',
      query: document,
      variables: { draft },
    })
    .then((data) => customerSignMeInSchema.parse(data));
}
