import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';
import type { PriceRange, QueryProductsReturn } from '~/entities/product';
import type { FCProps, FCPropsWC } from '~/shared/model/types';

type Product = QueryProductsReturn['products'][number];

type Props = FCPropsWC<{ productData?: Product }>;

type MediaProps = FCProps<{
  name: Product['name'];
  image?: Product['masterImage'];
}>;

function Media({ name, image }: MediaProps): ReactNode {
  return (
    <Tooltip
      title={name}
      arrow
    >
      <Paper>
        <CardMedia
          className="h-56 w-auto bg-cover"
          image={image?.url}
        />
      </Paper>
    </Tooltip>
  );
}

type NameProps = FCProps<{
  name: Product['name'];
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
  description: Product['description'];
}>;

function Description({ description }: DescriptionProps): ReactNode {
  return (
    <Typography
      variant="body2"
      className="line-clamp-4 grow text-wrap"
    >
      {description}
    </Typography>
  );
}

type PricesProps = FCProps<{
  priceCurrencyCode: Product['priceCurrencyCode'];
  priceRange: Nullable<PriceRange>;
  discountedPriceRange: Nullable<PriceRange>;
}>;

function Prices({ priceCurrencyCode, priceRange, discountedPriceRange }: PricesProps): ReactNode {
  const currencyMap = { USD: '$' } as const;
  const currencyCode = currencyMap[priceCurrencyCode];

  const createPriceLabel = (range: PriceRange): string =>
    range.min === range.max
      ? `${currencyCode}${range.min.toString()}`
      : `${currencyCode}${range.min.toString()} - ${currencyCode}${range.max.toString()}`;

  return (
    <Box className="flex justify-center gap-2">
      {discountedPriceRange && (
        <Typography
          color="primary"
          sx={{ textShadow: '0 0 .6rem' }}
          className="font-bold"
        >
          {createPriceLabel(discountedPriceRange)}
        </Typography>
      )}
      {priceRange && (
        <Typography
          variant={discountedPriceRange ? 'caption' : 'body1'}
          color={discountedPriceRange ? 'error.light' : 'primary'}
          sx={{ textShadow: discountedPriceRange && '0 0 .6rem' }}
          className={clsx('font-medium', discountedPriceRange && 'line-through')}
        >
          {createPriceLabel(priceRange)}
        </Typography>
      )}
    </Box>
  );
}

type ViewDetailsProps = FCProps<{ productKey: Product['key'] }>;

function ViewDetails({ productKey }: ViewDetailsProps): ReactNode {
  const buttonText = 'View Details';

  return productKey ? (
    <Button
      variant="outlined"
      href={`${Route.PRODUCT}/${productKey}`}
    >
      {buttonText}
    </Button>
  ) : (
    <Button
      variant="outlined"
      disabled
    >
      {buttonText}
    </Button>
  );
}

export function ProductCard({ productData }: Props): ReactNode {
  if (!productData) {
    return (
      <Skeleton
        className="relative h-[30rem] w-80"
        variant="rectangular"
      />
    );
  }

  const { key, masterImage, name, description, priceCurrencyCode, priceRange, discountedPriceRange } = productData;

  return (
    <Card
      className="relative h-[30rem] w-80"
      sx={{ ':hover': { boxShadow: 8 } }}
    >
      <CardContent
        component={Stack}
        spacing={1.5}
        height="inherit"
      >
        <Media
          name={name}
          image={masterImage}
        />

        <Name name={name} />

        <Description description={description} />

        <Prices
          priceCurrencyCode={priceCurrencyCode}
          priceRange={priceRange}
          discountedPriceRange={discountedPriceRange}
        />

        <ViewDetails productKey={key} />
      </CardContent>
    </Card>
  );
}
