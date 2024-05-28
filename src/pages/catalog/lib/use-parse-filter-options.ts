import { useMemo } from 'react';

import {
  createCategoryFilter,
  createDoughFilter,
  createPriceFilter,
  createSizeFilter,
} from '~/shared/api/commercetools';

import type { QueryProductProjectionSearchVariables } from '~/shared/api/commercetools';

export function useParseFilterOptions({
  categories,
  doughs,
  price,
  sizes,
}: {
  categories: string[];
  sizes: string[];
  doughs: string[];
  price: { from?: string; to?: string };
}): QueryProductProjectionSearchVariables['filters'] {
  return useMemo(
    () => [
      createCategoryFilter(categories),
      createPriceFilter(price),
      createSizeFilter(sizes),
      createDoughFilter(doughs),
    ],
    [categories, doughs, price, sizes]
  );
}
