import { useQuery } from '@tanstack/react-query';
import { Stack } from '@mui/material';

import { useAuthStore } from '~/entities/auth-store';
import { PageSpinner } from '~/entities/page-spinner';
import { getPagedQueryResult } from '~/shared/api/commercetools';

import { ProductCard } from './product-card';

import type { ReactNode } from 'react';

export function Catalog(): ReactNode {
  const { token } = useAuthStore((store) => ({ token: store.access_token }));

  const { data, isPending } = useQuery({
    queryKey: ['catalog', token],
    queryFn() {
      if (token === null) {
        return null;
      }

      return getPagedQueryResult(token);
    },
  });

  if (isPending) {
    return <PageSpinner />;
  }

  return (
    <Stack className="flex-row flex-wrap justify-center gap-8">
      {data?.results.map((result) => (
        <ProductCard
          key={result.id}
          productProjection={result}
        />
      ))}
    </Stack>
  );
}
