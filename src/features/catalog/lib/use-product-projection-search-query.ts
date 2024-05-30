import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '~/entities/auth-store';
import { queryProductProjectionSearch } from '~/shared/api/commercetools';

import type { UseQueryResult } from '@tanstack/react-query';
import type {
  QueryProductProjectionSearchReturn,
  QueryProductProjectionSearchVariables,
} from '~/shared/api/commercetools';

export function useProductProjectionSearchQuery(
  variables: QueryProductProjectionSearchVariables
): UseQueryResult<QueryProductProjectionSearchReturn> {
  const { token } = useAuthStore((store) => ({ token: store.access_token }));

  return useQuery({
    queryKey: ['catalog', token, variables],
    queryFn: () => queryProductProjectionSearch({ token, variables }),
  });
}
