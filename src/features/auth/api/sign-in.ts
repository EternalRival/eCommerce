import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

const operationName = QueryKey.SIGN_IN;

const query = `
mutation ${operationName}($draft: CustomerSignMeInDraft!) {
  customerSignMeIn(draft: $draft) {
    customer {
      id
      email
    }
  }
}
`;

const signInSchema = z.object({
  customerSignMeIn: z.object({
    customer: z.object({
      id: z.string(),
      email: z.string(),
    }),
  }),
});

type SignInReturn = z.infer<typeof signInSchema>;

type Draft = {
  email: string;
  password: string;
};

type SignInDto = {
  token: Maybe<string>;
  variables: {
    draft: Draft;
  };
};

export async function signIn({ token, variables }: SignInDto): Promise<SignInReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => signInSchema.parse(data));
}
