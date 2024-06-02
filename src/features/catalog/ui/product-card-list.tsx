import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAuthStore } from '~/entities/auth-store';
import { useCurrentCategory } from '~/entities/categories';
import { createCategoryFilter, createEnumAttributeFilter, useProductsQuery } from '~/entities/products';
import { useParsedUrl } from '~/shared/lib/parse-url';

import { ProductCard } from './product-card';

import type { ReactNode } from 'react';
import type { SearchFilterInput } from '~/entities/products';

function useParseFilters(): { isPending: boolean; filters: SearchFilterInput[] } {
  const { parsedUrl } = useParsedUrl();

  const token = useAuthStore((store) => store.access_token);
  const { isPending, currentCategory } = useCurrentCategory({ token });

  const filters = [];

  if (currentCategory?.id) {
    filters.push(createCategoryFilter({ id: currentCategory.id }));
  }

  const params = new URLSearchParams(parsedUrl.search);

  new Set(params.keys()).forEach((key) => filters.push(createEnumAttributeFilter({ key, values: params.getAll(key) })));

  return { isPending, filters };
}

export function ProductCardList(): ReactNode {
  const token = useAuthStore((store) => store.access_token);

  const { filters, isPending } = useParseFilters();

  const productQuery = useProductsQuery({
    token,
    variables: {
      limit: 500,
      offset: 0,
      filters,
    },
    enabled: !isPending,
  });

  if (productQuery.isPending) {
    return (
      <Stack className="grow flex-row flex-wrap justify-center gap-8">
        {Array.from({ length: 6 }, (_, i) => (
          <ProductCard key={i} />
        ))}
      </Stack>
    );
  }

  if (!productQuery.data) {
    return <Typography>No products</Typography>;
  }

  if (productQuery.data.products.length < 1) {
    return <Typography>No products found</Typography>;
  }

  return (
    <Stack className="grow flex-row flex-wrap justify-center gap-8">
      {productQuery.data.products.map((product) => (
        <ProductCard
          key={product.id}
          productData={product}
        />
      ))}
    </Stack>
  );
}
