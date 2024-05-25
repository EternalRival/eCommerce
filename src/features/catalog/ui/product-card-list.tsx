import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

import { ProductCard } from './product-card';

import type { ReactNode } from 'react';
import type { QueryProductProjectionSearchReturn } from '~/shared/api/commercetools';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<{
  listData?: QueryProductProjectionSearchReturn['results'];
}>;

export function ProductCardList({ listData }: Props): ReactNode {
  const noListText = 'No products';
  const emptyListText = 'No products found';

  if (!listData) {
    return <Typography>{noListText}</Typography>;
  }

  if (listData.length === 0) {
    return <Typography>{emptyListText}</Typography>;
  }

  return (
    <Stack className="flex-row flex-wrap justify-center gap-8">
      {listData.map((result) => (
        <ProductCard
          key={result.id}
          productProjection={result}
        />
      ))}
    </Stack>
  );
}
