import Typography from '@mui/material/Typography';

import { Catalog, CategoryBreadcrumbs } from '~/features/catalog';

import { usePruneInvalidCategoriesFromUrl } from '../lib';

import type { ReactNode } from 'react';

export function CatalogPage(): ReactNode {
  usePruneInvalidCategoriesFromUrl();

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Catalog Page
      </Typography>

      <CategoryBreadcrumbs />

      <Catalog />
    </>
  );
}
