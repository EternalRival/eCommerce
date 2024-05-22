import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

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

      <Box
        component="pre"
        className="ring"
      >
        123
      </Box>
    </>
  );
}
