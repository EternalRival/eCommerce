import Stack from '@mui/material/Stack';

import { useProductProjectionSearchQuery } from '../lib';
import { CategoryPicker } from './category-picker';
import { ProductCardList } from './product-card-list';

import type { ReactNode } from 'react';
import type { Category, QueryProductProjectionSearchVariables } from '~/shared/api/commercetools';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<{
  categories: Category[];
  categoriesIsPending: boolean;
  productProjectionSearchQueryVariables: QueryProductProjectionSearchVariables;
}>;

export function Catalog({ categories, categoriesIsPending, productProjectionSearchQueryVariables }: Props): ReactNode {
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

      <Stack className="shrink-0">
        <CategoryPicker
          categories={categories}
          isPending={categoriesIsPending}
        />
      </Stack>

      <ProductCardList
        isPending={catalogQuery.isPending}
        productProjectionSearchResult={catalogQuery.data}
      />
    </Stack>
  );
}
