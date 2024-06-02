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
import type { FCProps, FCPropsWC } from '~/shared/model/types';
import type { QueryProductsReturn } from '~/entities/products';

type Product = QueryProductsReturn['products'][number];

type Props = FCPropsWC<{ productData?: Product }>;

type MediaProps = FCProps<{
  name: Product['name'];
  image?: Product['images'][number];
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

type BaseMoney = NonNullable<Product['price']>;

type PricesProps = FCProps<{
  price?: BaseMoney;
  discountedPrice?: BaseMoney;
}>;

function Prices({ price, discountedPrice }: PricesProps): ReactNode {
  const currencyMap = { USD: '$' } as const;
  const createPriceLabel = ({ centAmount, currencyCode, fractionDigits }: BaseMoney): string =>
    `${currencyMap[currencyCode]}${(centAmount / 10 ** fractionDigits).toString()}`;

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={1.5}
    >
      {(Boolean(discountedPrice) || Boolean(price)) && (
        <Stack
          direction="row"
          spacing={1}
        >
          {discountedPrice && (
            <Typography
              color="primary"
              sx={{ textShadow: '0 0 .6rem' }}
              className="font-bold"
            >
              {createPriceLabel(discountedPrice)}
            </Typography>
          )}
          {price && (
            <Typography
              variant={discountedPrice && 'caption'}
              color={discountedPrice ? 'error.light' : 'primary'}
              sx={{ textShadow: discountedPrice && '0 0 .6rem' }}
              className={clsx('font-medium', discountedPrice && 'line-through')}
            >
              {createPriceLabel(price)}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
}

type ViewDetailsProps = FCProps<{ slug: Product['slug'] }>;

function ViewDetails({ slug }: ViewDetailsProps): ReactNode {
  const buttonText = 'View Details';

  return slug ? (
    <Button
      variant="outlined"
      href={`${Route.PRODUCT}/${slug}`}
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

  const { slug, images, name, description, price, discountedPrice } = productData;

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
          image={images.find(({ url }) => Boolean(url))}
        />

        <Name name={name} />

        <Description description={description} />

        <Prices
          price={price}
          discountedPrice={discountedPrice}
        />

        <ViewDetails slug={slug} />
      </CardContent>
    </Card>
  );
}
