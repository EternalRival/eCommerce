import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';

import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

const operationName = 'SignIn';

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

const customerSignInSchema = z.object({
  customerSignMeIn: z.object({
    customer: z.object({
      id: z.string(),
      email: z.string(),
    }),
  }),
});

type MutateCustomerSignInReturn = z.infer<typeof customerSignInSchema>;

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

async function mutateCustomerSignIn({ token, variables }: SignInDto): Promise<MutateCustomerSignInReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => customerSignInSchema.parse(data));
}

type UseCustomerSignInMutationOptions = UseMutationOptions<MutateCustomerSignInReturn, Error, SignInDto>;

type UseCustomerSignInMutationResult = UseMutationResult<MutateCustomerSignInReturn, Error, SignInDto>;

export function useCustomerSignInMutation(
  options: Omit<UseCustomerSignInMutationOptions, 'mutationFn'> = {}
): UseCustomerSignInMutationResult {
  return useMutation({ mutationFn: mutateCustomerSignIn, ...options });
}
