import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '~/entities/auth-store';
import { PageSpinner } from '~/entities/page-spinner';
import { queryProductProjectionSearch } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import { ProductCardList } from './product-card-list';
import { Filters } from './filters';

import type { ReactNode } from 'react';

export function Catalog(): ReactNode {
  const { token } = useAuthStore((store) => ({ token: store.access_token }));

  const { data, isPending } = useQuery({
    queryKey: [QueryKey.CATALOG, token],
    queryFn() {
      return token === null ? null : queryProductProjectionSearch(token);
    },
  });

  if (isPending) {
    return <PageSpinner />;
  }

  return (
    <Stack direction="row">
      <Filters />
      <ProductCardList listData={data?.results} />
    </Stack>
  );
}
