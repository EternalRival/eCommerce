import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '~/entities/auth-store';
import { queryProductProjectionSearch } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import { ProductCardList } from './product-card-list';

import type { ReactNode } from 'react';

export function Catalog(): ReactNode {
  const { token } = useAuthStore((store) => ({ token: store.access_token }));

  const catalogQuery = useQuery({
    queryKey: [QueryKey.CATALOG, token],
    queryFn() {
      return queryProductProjectionSearch(token);
    },
  });

  /*   const productTypesQuery = useQuery({
    queryKey: [QueryKey.PRODUCT_TYPES, token],
    queryFn() {
      return queryProductTypes(token);
    },
    throwOnError: true,
  }); */

  return (
    <Stack direction="row">
      {/* <Filters
        isPending={productTypesQuery.isPending}
        productTypesReturn={productTypesQuery.data}
      /> */}

      <ProductCardList
        isPending={catalogQuery.isPending}
        productProjectionSearchResult={catalogQuery.data}
      />
    </Stack>
  );
}
