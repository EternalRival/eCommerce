import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '~/entities/auth-store';
import { queryProductProjectionSearch } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import { Filters } from './filters';
import { ProductCardList } from './product-card-list';

import type { ReactNode } from 'react';

export function Catalog(): ReactNode {
  const { token } = useAuthStore((store) => ({ token: store.access_token }));

  const catalogQuery = useQuery({
    queryKey: [QueryKey.CATALOG, token],
    queryFn() {
      return token === null ? null : queryProductProjectionSearch(token);
    },
  });

  return (
    <Stack direction="row">
      <Filters />

      <ProductCardList
        isPending={catalogQuery.isPending}
        listData={catalogQuery.data?.results}
      />
    </Stack>
  );
}
