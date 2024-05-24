import { Card, CardContent, CardMedia, Paper, Stack, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';

import type { ReactNode } from 'react';
import type { QueryProductProjectionSearchReturn } from '~/shared/api/commercetools';
import type { FCProps, FCPropsWC } from '~/shared/model/types';

type ProductProjection = QueryProductProjectionSearchReturn['results'][number];

type Props = FCPropsWC<{ productProjection: ProductProjection }>;

type MediaProps = FCProps<{
  name: ProductProjection['name'];
  image?: ProductProjection['masterVariant']['images'][number];
}>;

function Media({ name, image }: MediaProps): ReactNode {
  // ? Image из next/image совместимо с CardMedia?
  return (
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
  );
}

type NameProps = FCProps<{
  name: ProductProjection['name'];
}>;

function Name({ name }: NameProps): ReactNode {
  return (
    <Tooltip
      title={name}
      followCursor
    >
      <Typography
        component="p"
        variant="h6"
        color="primary"
        className="line-clamp-1 w-fit"
      >
        {name}
      </Typography>
    </Tooltip>
  );
}

type DescriptionProps = FCProps<{
  description: ProductProjection['description'];
}>;

function Description({ description }: DescriptionProps): ReactNode {
  return (
    <Typography
      variant="body2"
      className="line-clamp-5 text-wrap"
    >
      {description}
    </Typography>
  );
}

type BaseMoney = NonNullable<ProductProjection['masterVariant']['price']>['value'];

type PricesProps = FCProps<{
  discountedValue?: BaseMoney;
  priceValue?: BaseMoney;
}>;

function Prices({ discountedValue, priceValue }: PricesProps): ReactNode {
  const currencyMap = { USD: '$', EUR: '€', GBP: '£' } as const;
  const createPriceLabel = ({ centAmount, currencyCode, fractionDigits }: BaseMoney): string =>
    `${currencyMap[currencyCode]}${(centAmount / 10 ** fractionDigits).toString()}`;

  return (
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
            <Typography
              color="primary"
              sx={{ textShadow: '0 0 .6rem' }}
              className="font-bold"
            >
              {createPriceLabel(discountedValue)}
            </Typography>
          )}
          {priceValue && (
            <Typography
              variant={discountedValue && 'caption'}
              color={discountedValue ? 'error.light' : 'primary'}
              sx={{ textShadow: discountedValue && '0 0 .6rem' }}
              className={clsx('font-medium', discountedValue && 'line-through')}
            >
              {createPriceLabel(priceValue)}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
}

export function ProductCard({ productProjection }: Props): ReactNode {
  const { name, description, masterVariant } = productProjection;
  const { images, price } = masterVariant;

  return (
    <Card className="relative h-[30rem] w-80">
      <CardContent
        component={Stack}
        spacing={1.5}
      >
        <Media
          name={name}
          image={images.find(({ url }) => Boolean(url))}
        />

        <Name name={name} />

        <Description description={description} />

        <Prices
          priceValue={price?.value}
          discountedValue={price?.discounted?.value}
        />
      </CardContent>
    </Card>
  );
}
