import type { CurrencyCode } from '~/shared/api/commercetools';
import type { Price } from './price.schema';

type Variant = { price?: Price };

export type PriceRange = { min: number; max: number };

type GetProductPriceRangeReturn = {
  priceCurrencyCode: CurrencyCode;
  priceRange: Nullable<PriceRange>;
  discountedPriceRange: Nullable<PriceRange>;
};

export function getProductPriceRanges({
  currencyCode,
  variants,
}: {
  currencyCode: Maybe<CurrencyCode>;
  variants: Variant[];
}): GetProductPriceRangeReturn {
  if (typeof currencyCode !== 'string') {
    throw new Error('No Currency Code provided');
  }

  const initialMin = Number.MAX_SAFE_INTEGER;
  const initialMax = Number.MIN_SAFE_INTEGER;

  let [priceMin, discountedPriceMin] = [initialMin, initialMin];
  let [priceMax, discountedPriceMax] = [initialMax, initialMax];

  variants.forEach((variant) => {
    const price = variant.price?.value ?? null;
    const discountedPrice = variant.price?.discounted?.value ?? null;

    if (price?.currencyCode === currencyCode) {
      const priceValue = price.centAmount / 10 ** price.fractionDigits;

      priceMin = Math.min(priceValue, priceMin);
      priceMax = Math.max(priceValue, priceMax);
    }

    if (discountedPrice?.currencyCode === currencyCode) {
      const priceValue = discountedPrice.centAmount / 10 ** discountedPrice.fractionDigits;

      discountedPriceMin = Math.min(priceValue, discountedPriceMin);
      discountedPriceMax = Math.max(priceValue, discountedPriceMax);
    }
  });

  return {
    priceCurrencyCode: currencyCode,
    priceRange: priceMin < initialMin && priceMax > initialMax ? { min: priceMin, max: priceMax } : null,
    discountedPriceRange:
      discountedPriceMin < initialMin && discountedPriceMax > initialMax
        ? { min: discountedPriceMin, max: discountedPriceMax }
        : null,
  };
}
