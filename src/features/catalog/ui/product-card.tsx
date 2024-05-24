import { Card, CardContent, CardMedia, Paper, Stack, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';

import type { ReactNode } from 'react';
import type { QueryProductProjectionSearchReturn } from '~/shared/api/commercetools';
import type { FCPropsWC } from '~/shared/model/types';

type ProductProjection = QueryProductProjectionSearchReturn['results'][number];

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
        <Tooltip
          title={name}
          arrow
        >
          <Paper>
            <CardMedia
              className="h-48 w-auto bg-contain"
              image={image?.url}
            />
          </Paper>
        </Tooltip>
        <Tooltip
          title={name}
          followCursor
        >
          <Typography
            component="p"
            variant="h6"
            className="line-clamp-1 w-fit"
          >
            {name}
          </Typography>
        </Tooltip>
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
          {(!!discountedValue || !!priceValue) && (
            <Stack
              direction="row"
              spacing={1}
            >
              {discountedValue && (
                <Typography className="font-bold [text-shadow:0_0_1rem_lime,0_0_1rem_lime,0_0_1rem_lime]">
                  {createPriceLabel(discountedValue)}
                </Typography>
              )}
              {priceValue && (
                <Typography
                  variant={discountedValue && 'caption'}
                  className={clsx(
                    'font-medium',
                    discountedValue && 'text-rose-500 line-through [text-shadow:0_0_.5rem_red]'
                  )}
                >
                  {createPriceLabel(priceValue)}
                </Typography>
              )}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
