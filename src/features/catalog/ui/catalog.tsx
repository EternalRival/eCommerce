import Stack from '@mui/material/Stack';

import { FiltersPicker } from './filters-picker';
import { CategoryPicker } from './category-picker';
import { ProductCardList } from './product-card-list';

import type { ReactNode } from 'react';

export function Catalog(): ReactNode {
  return (
    <Stack className="gap-4 md:flex-row">
      <Stack className="shrink-0 md:w-[max(18rem,25%)]">
        <CategoryPicker />
        <FiltersPicker />
      </Stack>

      <ProductCardList />
    </Stack>
  );
}
