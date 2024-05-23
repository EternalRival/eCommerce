import { Card, CardContent, CardMedia, Chip, Paper, Stack, Typography } from '@mui/material';
import clsx from 'clsx';

import type { ReactNode } from 'react';
import type { QueryProductProjectionSearchResult } from '~/shared/api/commercetools';
import type { FCPropsWC } from '~/shared/model/types';

type ProductProjection = QueryProductProjectionSearchResult['data']['productProjectionSearch']['results'][number];

type BaseMoney = NonNullable<ProductProjection['masterVariant']['price']>['value'];

export function ProductCard({ productProjection }: FCPropsWC<{ productProjection: ProductProjection }>): ReactNode {
  const { name, description, masterVariant } = productProjection;
  const { images, price } = masterVariant;
  const image = images.find(({ url }) => Boolean(url));
  const priceValue = price?.value;
  const discountedValue = price?.discounted?.value;

  const createPriceLabel = ({ centAmount, currencyCode, fractionDigits }: BaseMoney): string => {
    const currencyMap = { USD: '$', EUR: '€', GBP: '£' } as const;

    return `${currencyMap[currencyCode]}${(centAmount / 10 ** fractionDigits).toString()}`;
  };

  // ? Image из next/image совместимо с CardMedia?

  return (
    <Card className="relative h-[30rem] w-80">
      <CardContent
        component={Stack}
        spacing={1.5}
      >
        <Paper>
          <CardMedia
            className="h-48 w-auto bg-contain"
            image={image?.url}
          />
        </Paper>
        <Typography variant="h6">{name}</Typography>
        <Typography
          variant="body2"
          className="line-clamp-5 text-wrap"
        >
          {description}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1.5}
        >
          {discountedValue && (
            <Chip
              color="primary"
              label={createPriceLabel(discountedValue)}
            />
          )}
          {priceValue && (
            <Chip
              color="primary"
              className={clsx(discountedValue && 'line-through opacity-60')}
              label={createPriceLabel(priceValue)}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
