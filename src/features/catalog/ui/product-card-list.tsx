import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ProductCard } from './product-card';

import type { ReactNode } from 'react';
import type { QueryProductProjectionSearchReturn } from '~/shared/api/commercetools';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<{
  isPending?: boolean;
  productProjectionSearchResult?: QueryProductProjectionSearchReturn;
}>;

export function ProductCardList({ isPending, productProjectionSearchResult }: Props): ReactNode {
  const noListText = 'No products';
  const emptyListText = 'No products found';
  const containerClassName = 'flex-row flex-wrap justify-center gap-8';

  if (isPending) {
    return (
      <Stack className={containerClassName}>
        {Array.from({ length: 6 }, (_, i) => (
          <ProductCard key={i} />
        ))}
      </Stack>
    );
  }

  if (!productProjectionSearchResult) {
    return <Typography>{noListText}</Typography>;
  }

  if (productProjectionSearchResult.count === 0) {
    return <Typography>{emptyListText}</Typography>;
  }

  return (
    <Stack className={containerClassName}>
      {productProjectionSearchResult.results.map((result) => (
        <ProductCard
          key={result.id}
          productProjection={result}
        />
      ))}
    </Stack>
  );
}