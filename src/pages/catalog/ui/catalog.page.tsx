import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';

import { Breadcrumbs } from '~/entities/breadcrumbs';
import { Catalog } from '~/features/catalog';
import { useParseQueryParam } from '~/shared/lib/nextjs';
import { Route } from '~/shared/model/route.enum';

import {
  createCategoriesBreadcrumbsProps,
  getCurrentCategories,
  useCategoriesQuery,
  usePruneInvalidCategoriesFromUrl,
} from '../lib';

import type { ReactNode } from 'react';

const baseEndpoint = Route.CATALOG;

export function CatalogPage(): ReactNode {
  const slugList = useParseQueryParam('slug');

  // categories
  const categoriesQuery = useCategoriesQuery();
  const categories = categoriesQuery.data?.results;
  const currentCategories = useMemo(() => getCurrentCategories({ categories, slugList }), [categories, slugList]);

  // breadcrumbs
  const categoriesBreadcrumbsProps = useMemo(
    () => createCategoriesBreadcrumbsProps({ categories: currentCategories }),
    [currentCategories]
  );

  // validate+redirect
  usePruneInvalidCategoriesFromUrl({
    baseEndpoint,
    isReady: !categoriesQuery.isPending,
    getCategoryEndpoint: () => categoriesBreadcrumbsProps.at(-1)?.href ?? '',
  });

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Catalog Page
      </Typography>

      <Breadcrumbs
        baseEndpoint={baseEndpoint}
        baseEndpointLabel={<ViewModuleIcon />}
        isPending={slugList.length > 0 && categoriesQuery.isPending}
        breadcrumbsLinksProps={categoriesBreadcrumbsProps}
      />

      <Catalog />
    </>
  );
}
