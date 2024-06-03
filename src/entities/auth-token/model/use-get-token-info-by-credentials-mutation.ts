import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { $http, CTP_PROJECT_KEY, createScope, customerTokenScopes } from '~/shared/api/commercetools';

import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

const tokenInfoByCredentialsResultSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  refresh_token: z.string(),
});

const credentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type Credentials = z.infer<typeof credentialsSchema>;

type GetTokenInfoByCredentialsResult = z.infer<typeof tokenInfoByCredentialsResultSchema>;

type UseGetTokenInfoByCredentialsMutationOptions = UseMutationOptions<
  GetTokenInfoByCredentialsResult,
  Error,
  Credentials
>;

type UseGetTokenInfoByCredentialsMutationResult = UseMutationResult<
  GetTokenInfoByCredentialsResult,
  Error,
  Credentials
>;

async function mutateGetTokenInfoByCredentials(credentials: Credentials): Promise<GetTokenInfoByCredentialsResult> {
  return $http.auth
    .post(`/oauth/${CTP_PROJECT_KEY}/customers/token`, {
      grant_type: 'password',
      ...credentialsSchema.parse(credentials),
      scope: createScope(customerTokenScopes),
    })
    .then(({ data }) => tokenInfoByCredentialsResultSchema.parse(data));
}

export function useGetTokenInfoByCredentialsMutation(
  options: Omit<UseGetTokenInfoByCredentialsMutationOptions, 'mutationFn'> = {}
): UseGetTokenInfoByCredentialsMutationResult {
  return useMutation({ mutationFn: mutateGetTokenInfoByCredentials, ...options });
}
