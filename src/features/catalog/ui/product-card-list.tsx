import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAuthStore } from '~/entities/auth-store';
import { useCurrentCategory } from '~/entities/categories';
import { usePizzaAttributesQuery } from '~/entities/pizza-attributes';
import {
  createCategoryFilter,
  createEnumAttributeFilter,
  createPriceFilter,
  useProductsQuery,
} from '~/entities/products';
import { useSearchParams } from '~/shared/lib/use-search-params';

import { ProductCard } from './product-card';

import type { ReactNode } from 'react';
import type { SearchFilterInput } from '~/entities/products';

function useParseFilters(): { isPending: boolean; filters: SearchFilterInput[] } {
  const token = useAuthStore((store) => store.access_token);
  const { isPending, currentCategory } = useCurrentCategory({ token });
  const attributesQuery = usePizzaAttributesQuery({ token });
  const { searchParams } = useSearchParams();

  const filters = [];

  if (currentCategory?.id) {
    filters.push(createCategoryFilter({ id: currentCategory.id }));
  }

  attributesQuery.data?.attributes?.forEach((attribute) => {
    filters.push(
      createEnumAttributeFilter({
        key: attribute.key,
        values: searchParams.getAll(attribute.key).filter((value) => attribute.values.find(({ key }) => key === value)),
      })
    );
  });

  const [priceFrom, priceTo] = [searchParams.get('priceFrom'), searchParams.get('priceTo')];

  filters.push(
    createPriceFilter({
      from: priceFrom ? (Number(priceFrom) * 100).toString() : null,
      to: priceTo ? (Number(priceTo) * 100).toString() : null,
    })
  );

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

  return productQuery.data.products.length < 1 ? (
    <Typography>No products found</Typography>
  ) : (
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
