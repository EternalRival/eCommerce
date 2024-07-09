import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';

import { Prices, getProduct } from '~/entities/products';
import { useUserStore } from '~/entities/user';
import { useParseQueryParam } from '~/shared/lib/nextjs';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { Route } from '~/shared/model/route.enum';

import { Images } from './images';

import type { JSX } from 'react';

export function ProductDetails(): JSX.Element {
  const token = useUserStore((store) => store.token.access_token);
  const { param } = useParseQueryParam('slug');
  const [productSlug] = param;

  const getProductQuery = useQuery({
    queryKey: [QueryKey.PRODUCT, token, productSlug],
    queryFn() {
      return getProduct({
        token,
        variables: {
          key: productSlug,
        },
      });
    },
    enabled: Boolean(productSlug),
  });

  const product = getProductQuery.data?.product?.masterData.current;

  if (getProductQuery.isPending) {
    return (
      <Skeleton
        className="mx-auto h-96 w-full max-w-screen-lg"
        variant="rectangular"
      />
    );
  }

  if (!product) {
    return <Typography>No product found</Typography>;
  }

  return (
    <Paper className="relative mx-auto max-w-screen-lg">
      <IconButton
        component={NextLink}
        href={Route.CATALOG}
        className="absolute right-0 top-0"
      >
        <CloseIcon />
      </IconButton>
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
  );
}
