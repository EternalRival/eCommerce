import { Box, Grid, Paper, Typography } from '@mui/material';
import clsx from 'clsx';
import { useMemo } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { getProductPriceRanges, useProductQuery } from '~/entities/product';
import { useParseQueryParam } from '~/shared/lib/nextjs';

import { Images } from './images';

import type { ReactNode } from 'react';
import type { PriceRange, Variant } from '~/entities/product';
import type { FCProps } from '~/shared/model/types';

type PricesProps = FCProps<{
  variants: Variant[];
}>;

function Prices({ variants }: PricesProps): ReactNode {
  const currencyMap = { USD: '$' } as const;
  const currencyCode = variants.find((variant) => variant.price?.value.currencyCode)?.price?.value.currencyCode;
  const currencyCodeChar = currencyCode ? currencyMap[currencyCode] : '';

  const { priceRange, discountedPriceRange } = useMemo(
    () => getProductPriceRanges({ currencyCode, variants }),
    [currencyCode, variants]
  );

  const createPriceLabel = (range: PriceRange): string =>
    range.min === range.max
      ? `${currencyCodeChar}${range.min.toString()}`
      : `${currencyCodeChar}${range.min.toString()} - ${currencyCodeChar}${range.max.toString()}`;

  return (
    <Box className="flex gap-2">
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

export function Product(): ReactNode {
  const token = useAuthStore((store) => store.access_token);
  const { param } = useParseQueryParam('slug');
  const [productSlug] = param;

  const variables = { key: productSlug };

  const productQuery = useProductQuery({
    token,
    variables,
    enabled: Boolean(productSlug),
  });

  const product = productQuery.data?.product?.masterData.current;

  return (
    product && (
      <Paper className="mx-auto max-w-screen-lg">
        <Grid
          container
          className="p-4"
          direction="row"
        >
          <Grid
            className="p-4"
            item
            xs={12}
            sm={5}
          >
            <Images variants={[product.masterVariant, ...product.variants]} />
          </Grid>
          <Grid
            className="p-4"
            item
            xs={12}
            sm={7}
          >
            <Typography
              component="h2"
              variant="h4"
            >
              {product.name}
            </Typography>
            <Prices variants={[product.masterVariant, ...product.variants]} />
            <Typography
              variant="body2"
              className="line-clamp-4 grow text-wrap"
            >
              {product.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  );
}
