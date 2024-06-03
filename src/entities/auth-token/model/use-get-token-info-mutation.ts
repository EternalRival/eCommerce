import { useMutation } from '@tanstack/react-query';

import { mutateGetTokenInfo } from '~/shared/api/commercetools';

import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { GetTokenInfoResult } from '~/shared/api/commercetools';

type UseGetTokenInfoMutationOptions = UseMutationOptions<GetTokenInfoResult, Error, unknown>;

type UseGetTokenInfoMutationResult = UseMutationResult<GetTokenInfoResult>;

export function useGetTokenInfoMutation(
  options: Omit<UseGetTokenInfoMutationOptions, 'mutationFn'> = {}
): UseGetTokenInfoMutationResult {
  return useMutation({ mutationFn: mutateGetTokenInfo, ...options });
}
