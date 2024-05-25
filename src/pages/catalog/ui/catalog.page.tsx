import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';

import { Catalog } from '~/features/catalog';
import { Route } from '~/shared/model/route.enum';
import { CategoriesBreadcrumbs } from '~/features/categories-breadcrumbs';

import { createCategoriesBreadcrumbsProps, useCategories, usePruneCategoriesEndpoint } from '../lib';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

export type CatalogPageProps = FCProps<{
  slug: string[];
}>;

const baseEndpoint = Route.CATALOG;

export function CatalogPage({ slug }: CatalogPageProps): ReactNode {
  const { data, isPending } = useCategories();

  const categoriesBreadcrumbsProps = useMemo(() => createCategoriesBreadcrumbsProps(slug, data), [data, slug]);

  usePruneCategoriesEndpoint({ isReady: !isPending, categoriesBreadcrumbsProps, baseEndpoint });

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Catalog Page
      </Typography>

      {categoriesBreadcrumbsProps.length > 0 && (
        <CategoriesBreadcrumbs
          baseEndpoint={baseEndpoint}
          categoriesBreadcrumbsProps={categoriesBreadcrumbsProps}
        />
      )}

      <Box>
        <Catalog />
      </Box>
    </>
  );
}
