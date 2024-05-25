import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '~/entities/auth-store';
import { queryCategories } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { QueryCategoriesReturn } from '~/shared/api/commercetools';
import type { UseQueryResult } from '@tanstack/react-query';

type QueryFnReturn = Nullable<QueryCategoriesReturn['results']>;

type UseQueryReturn = UseQueryResult<QueryFnReturn>;

type UseCategoriesReturn = Pick<UseQueryReturn, 'isPending' | 'data'>;

export function useCategories(): UseCategoriesReturn {
  const { token } = useAuthStore((store) => ({ token: store.access_token }));

  const { data, isPending } = useQuery({
    queryKey: [QueryKey.CATEGORIES, token],
    async queryFn() {
      if (token === null) {
        return null;
      }

      const { results } = await queryCategories(token);

      return results;
    },
  });

  return { data, isPending };
}
