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
import Image from 'next/image';

import { Route } from '~/shared/model/route.enum';

import { Prices } from './prices';

import type { JSX } from 'react';
import type { GetProductsReturn } from '../api';

type ProductCardProps = Readonly<{
  productData?: GetProductsReturn['productProjectionSearch']['results'][number];
}>;

export function ProductCard({ productData }: ProductCardProps): JSX.Element {
  if (!productData) {
    return (
      <Skeleton
        className="relative h-[30rem] w-80"
        variant="rectangular"
      />
    );
  }

  const imageProps = productData.masterVariant.images.find(({ url }) => url);

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
        <Tooltip
          title={productData.name}
          arrow
        >
          <Paper>
            <CardMedia className="h-56">
              <Image
                src={imageProps?.url ?? ''}
                alt={imageProps?.label ?? ''}
                width={imageProps?.dimensions.width}
                height={imageProps?.dimensions.height}
                className="h-full w-auto"
              />
            </CardMedia>
          </Paper>
        </Tooltip>

        <Tooltip
          title={productData.name}
          followCursor
        >
          <Typography
            component="p"
            variant="h6"
            color="primary"
            className="line-clamp-1 w-fit"
          >
            {productData.name}
          </Typography>
        </Tooltip>

        <Typography
          variant="body2"
          className="line-clamp-4 grow text-wrap"
        >
          {productData.description}
        </Typography>

        <Box className="flex justify-center">
          <Prices variants={[productData.masterVariant, ...productData.variants]} />
        </Box>

        <Button
          variant="outlined"
          href={`${Route.PRODUCT}/${productData.key ?? ''}`}
          disabled={!productData.key}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
