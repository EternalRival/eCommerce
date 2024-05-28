import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '~/entities/auth-store';
import { queryCategories } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { QueryCategoriesReturn } from '~/shared/api/commercetools';
import type { UseQueryResult } from '@tanstack/react-query';

export function useCategoriesQuery(): UseQueryResult<QueryCategoriesReturn> {
  const { token } = useAuthStore((store) => ({ token: store.access_token }));

  return useQuery({
    queryKey: [QueryKey.CATEGORIES, token],
    queryFn: () => queryCategories({ token, variables: { limit: 30 } }),
  });
}
