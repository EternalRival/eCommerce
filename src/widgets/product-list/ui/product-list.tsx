import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';

import { ProductCard, getProducts } from '~/entities/products';
import { useUserStore } from '~/entities/user';
import { useParseFilters, useParseSearch, useParseSorts } from '~/features/catalog/parse-query-params';
import { SortingSelect } from '~/features/catalog/sort';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { JSX } from 'react';

export function ProductList(): JSX.Element {
  const token = useUserStore((store) => store.token.access_token);

  const { filters, isPending } = useParseFilters();
  const { sorts } = useParseSorts();
  const search = useParseSearch();

  const getProductsQuery = useQuery({
    queryKey: [QueryKey.PRODUCTS, token, filters, search, sorts],
    queryFn() {
      return getProducts({
        token,
        variables: {
          limit: 500,
          offset: 0,
          search,
          filters,
          sorts,
        },
      });
    },
    enabled: !isPending,
  });

  if (getProductsQuery.isPending) {
    return (
      <Box className="grid grow content-start justify-items-center gap-8 px-4 lg:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <ProductCard key={i} />
        ))}
      </Box>
    );
  }

  if (!getProductsQuery.data) {
    return <Typography>No products</Typography>;
  }

  return getProductsQuery.data.productProjectionSearch.count < 1 ? (
    <Typography>No products found</Typography>
  ) : (
    <Box className="flex grow flex-col gap-2 px-2">
      <SortingSelect />
      <Box className="grid justify-evenly gap-x-4 gap-y-8 lg:grid-cols-[repeat(2,20rem)] 2xl:grid-cols-[repeat(3,20rem)]">
        {getProductsQuery.data.productProjectionSearch.results.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
          />
        ))}
      </Box>
    </Box>
  );
}
