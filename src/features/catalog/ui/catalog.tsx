import Stack from '@mui/material/Stack';

import { useProductProjectionSearchQuery } from '../lib';
import { ProductCardList } from './product-card-list';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<{
  productProjectionSearchQueryVariables: Parameters<typeof useProductProjectionSearchQuery>[0];
}>;

/* const filters = useMemo(
    () => [
      createSizeFilter(['30cm']),
      createDoughFilter(['thin', 'traditional']),
      createPriceFilter({ from: 660, to: 800 }),
      createCategoryFilter(['27a860ea-41c0-4613-a35e-ac58c5ada96e']),
    ],
    []
  ); */

export function Catalog({ productProjectionSearchQueryVariables }: Props): ReactNode {
  const catalogQuery = useProductProjectionSearchQuery(productProjectionSearchQueryVariables);

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
