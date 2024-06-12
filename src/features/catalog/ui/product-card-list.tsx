import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useAuthStore } from '~/entities/auth-store';
import { useCurrentCategory } from '~/entities/categories';
import { usePizzaAttributesQuery } from '~/entities/pizza-attributes';
import {
  createCategoryFilter,
  createEnumAttributeFilter,
  createPriceFilter,
  createSearch,
  createSorts,
  useProductsQuery,
} from '~/entities/product';
import { useSearchParams } from '~/shared/lib/use-search-params';

import { ProductCard } from './product-card';
import { SortingSelect } from './sorting-select';
import { ParamKey } from '../model';

import type { ReactNode } from 'react';
import type { SearchFilterInput } from '~/entities/product';

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

  const [priceFrom, priceTo] = [searchParams.get(ParamKey.PRICE_MIN), searchParams.get(ParamKey.PRICE_MAX)];

  filters.push(
    createPriceFilter({
      from: priceFrom ? (Number(priceFrom) * 100).toString() : null,
      to: priceTo ? (Number(priceTo) * 100).toString() : null,
    })
  );

  return { isPending, filters };
}

function useParseSorts(): { sorts: string[] } {
  const { searchParams } = useSearchParams();

  return { sorts: createSorts(searchParams.getAll(ParamKey.SORT)) };
}

function useParseSearch(): string {
  const { searchParams } = useSearchParams();

  return createSearch(searchParams.get(ParamKey.SEARCH));
}

export function ProductCardList(): ReactNode {
  const token = useAuthStore((store) => store.access_token);

  const { filters, isPending } = useParseFilters();
  const { sorts } = useParseSorts();
  const search = useParseSearch();

  const productQuery = useProductsQuery({
    token,
    variables: {
      limit: 500,
      offset: 0,
      search,
      filters,
      sorts,
    },
    enabled: !isPending,
  });

  if (productQuery.isPending) {
    return (
      <Box className="grid grow content-start justify-items-center gap-8 px-4 lg:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <ProductCard key={i} />
        ))}
      </Box>
    );
  }

  if (!productQuery.data) {
    return <Typography>No products</Typography>;
  }

  return productQuery.data.productProjectionSearch.count < 1 ? (
    <Typography>No products found</Typography>
  ) : (
    <Box className="flex grow flex-col gap-2 px-2">
      <SortingSelect />
      <Box className="grid justify-evenly gap-x-4 gap-y-8 lg:grid-cols-[repeat(2,20rem)] 2xl:grid-cols-[repeat(3,20rem)]">
        {productQuery.data.productProjectionSearch.results.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
          />
        ))}
      </Box>
    </Box>
  );
}
