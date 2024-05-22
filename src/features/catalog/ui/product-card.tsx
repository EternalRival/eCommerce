import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import type { ReactNode } from 'react';
import type { ProductProjection } from '~/shared/api/commercetools';
import type { FCPropsWC } from '~/shared/model/types';

export function ProductCard({ productProjection }: FCPropsWC<{ productProjection: ProductProjection }>): ReactNode {
  const name = productProjection.name['en-US'];
  const description = productProjection.description?.['en-US'];
  const image = productProjection.masterVariant.images?.find(({ url }) => Boolean(url));

  // ? Image из next/image совместно с CardMedia?

  return (
    <Card className="relative h-96 max-w-80">
      <CardContent>
        <CardMedia
          className="h-48 w-auto bg-contain"
          image={image?.url}
          title={image?.label}
        />
        <Typography
          gutterBottom
          variant="h6"
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          className="line-clamp-5 text-wrap"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
