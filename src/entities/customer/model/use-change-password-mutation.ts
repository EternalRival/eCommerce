import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

const operationName = QueryKey.CHANGE_PASSWORD;

const query = `
mutation ${operationName}($version: Long!, $currentPassword: String!, $newPassword: String!) {
  customerChangeMyPassword(version: $version, currentPassword: $currentPassword, newPassword: $newPassword) {
    id
    email
  }
}
`;

const changePasswordSchema = z.object({
  customerChangeMyPassword: z
    .object({
      id: z.string(),
      email: z.string(),
    })
    .nullish(),
});

type MutateChangePasswordReturn = z.infer<typeof changePasswordSchema>;

type ChangePasswordDto = {
  token: Maybe<string>;
  variables: {
    version: number;
    currentPassword: string;
    newPassword: string;
  };
};

async function mutateChangePassword({ token, variables }: ChangePasswordDto): Promise<MutateChangePasswordReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => changePasswordSchema.parse(data));
}

type UseChangePasswordMutationOptions = UseMutationOptions<MutateChangePasswordReturn, Error, ChangePasswordDto>;

type UseChangePasswordMutationResult = UseMutationResult<MutateChangePasswordReturn, Error, ChangePasswordDto>;

export function useChangePasswordMutation(
  options: Omit<UseChangePasswordMutationOptions, 'mutationFn'> = {}
): UseChangePasswordMutationResult {
  return useMutation({ mutationFn: mutateChangePassword, ...options });
}
