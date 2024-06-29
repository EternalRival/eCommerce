import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/shared/lib/tanstack-query';

import { getProduct } from '../api';

import type { GetProductReturn } from '../api';
import type { UseQueryResult } from '@tanstack/react-query';

export function useGetProductQuery({
  token,
  variables,
  enabled,
}: Parameters<typeof getProduct>[0] & { enabled?: boolean }): UseQueryResult<GetProductReturn> {
  return useQuery({
    queryKey: [QueryKey.PRODUCT, token, variables],
    queryFn() {
      return getProduct({ token, variables });
    },
    enabled,
  });
}
