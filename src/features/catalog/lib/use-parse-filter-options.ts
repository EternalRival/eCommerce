import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { createDoughFilter, createPriceFilter, createSizeFilter } from '~/shared/api/commercetools';
import { createParseQueryParam } from '~/shared/lib/nextjs';

import type { QueryProductProjectionSearchVariables } from '~/shared/api/commercetools';

export function useParseFilterOptions(): QueryProductProjectionSearchVariables['filters'] {
  const router = useRouter();
  const parseQueryParam = createParseQueryParam(router.query);

  return useMemo(
    () => [
      createPriceFilter({
        from: parseQueryParam('priceFrom')[0],
        to: parseQueryParam('priceTo')[0],
      }),
      createSizeFilter(parseQueryParam('size')),
      createDoughFilter(parseQueryParam('dough')),
    ],
    [parseQueryParam]
  );
}
