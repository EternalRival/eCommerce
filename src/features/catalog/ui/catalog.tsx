import Stack from '@mui/material/Stack';

import { useProductProjectionSearchQuery } from '../lib';
import { AttributesPicker } from './attributes-picker';
import { CategoryPicker } from './category-picker';
import { ProductCardList } from './product-card-list';

import type { ReactNode } from 'react';

export function Catalog(): ReactNode {
  const productProjectionSearchQueryVariables = { limit: 50, offset: 0 /* , filters */ };

  const catalogQuery = useProductProjectionSearchQuery(productProjectionSearchQueryVariables);

  return (
    <Stack className="gap-4 md:flex-row">
      <Stack className="shrink-0 md:w-[max(18rem,25%)]">
        <CategoryPicker />
        <AttributesPicker />
      </Stack>

      <ProductCardList
        isPending={catalogQuery.isPending}
        productProjectionSearchResult={catalogQuery.data}
      />
    </Stack>
  );
}
