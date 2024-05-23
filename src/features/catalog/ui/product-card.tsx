import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';

import { useLocaleStore } from '~/entities/locale-store';

import type { ReactNode } from 'react';
import type { Price, ProductProjection } from '~/shared/api/commercetools';
import type { FCPropsWC } from '~/shared/model/types';

function PriceChip({ value }: Price): ReactNode {
  const priceValue = (value.centAmount / 10 ** value.fractionDigits).toString();
  const currency = value.currencyCode;

  return <Chip label={`${priceValue} ${currency}`} />;
}

export function ProductCard({ productProjection }: FCPropsWC<{ productProjection: ProductProjection }>): ReactNode {
  const localeStore = useLocaleStore((store) => store);
  const name = productProjection.name[localeStore.locale];
  const description = productProjection.description?.[localeStore.locale];
  const image = productProjection.masterVariant.images?.find(({ url }) => Boolean(url));
  const price = productProjection.masterVariant.prices?.find(({ country }) => country === localeStore.country);

  // ? Image из next/image совместимо с CardMedia?

  return (
    <Card className="relative h-[30rem] w-80">
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
        {price && <PriceChip {...price} />}
      </CardContent>
    </Card>
  );
}
