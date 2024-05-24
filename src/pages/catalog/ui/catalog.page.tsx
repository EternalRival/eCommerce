import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Catalog } from '~/features/catalog';

import type { ReactNode } from 'react';

export function CatalogPage(): ReactNode {
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Catalog Page
      </Typography>

      <Box>
        <Catalog />
      </Box>
    </>
  );
}
