import Stack from '@mui/material/Stack';

import { useParseFilterOptions, useProductProjectionSearchQuery } from '../lib';
import { ProductCardList } from './product-card-list';

import type { ReactNode } from 'react';

export function Catalog(): ReactNode {
  const filters = useParseFilterOptions();

  const catalogQuery = useProductProjectionSearchQuery({ limit: 50, offset: 0, filters });

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

      {/* <CategoryPicker
        isPending={categoryQuery.isPending}
        categoriesReturn={categoryQuery.data}
      /> */}

      <ProductCardList
        isPending={catalogQuery.isPending}
        productProjectionSearchResult={catalogQuery.data}
      />
    </Stack>
  );
}
