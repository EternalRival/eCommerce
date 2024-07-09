import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { getProductPriceRanges } from '../lib';

import type { JSX } from 'react';
import type { PriceRange } from '../lib';
import type { Variant } from '../model';

type PricesProps = Readonly<{
  variants: Variant[];
}>;

export function Prices({ variants }: PricesProps): JSX.Element {
  const currencyMap = { USD: '$' } as const;
  const currencyCode = variants.find((variant) => variant.price?.value.currencyCode)?.price?.value.currencyCode;
  const currencyCodeChar = currencyCode ? currencyMap[currencyCode] : '';

  const { priceRange, discountedPriceRange } = getProductPriceRanges({ currencyCode, variants });

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
          className={clsx('font-medium', discountedPriceRange && 'line-through [text-shadow:0_0_.6rem]')}
        >
          {createPriceLabel(priceRange)}
        </Typography>
      )}
    </Box>
  );
}
