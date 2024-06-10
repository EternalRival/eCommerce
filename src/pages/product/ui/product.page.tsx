import Typography from '@mui/material/Typography';

import { Product } from '~/features/product';

import type { ReactNode } from 'react';

export function ProductPage(): ReactNode {
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Product Page
      </Typography>

      <Product />
    </>
  );
}
