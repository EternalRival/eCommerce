import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { Breadcrumbs } from '~/entities/breadcrumbs';
import { Catalog } from '~/features/catalog';
import { createParseQueryParam } from '~/shared/lib/nextjs';
import { Route } from '~/shared/model/route.enum';

import {
  createCategoriesBreadcrumbsProps,
  getCurrentCategoryTree,
  useCategoriesQuery,
  useParseFilterOptions,
  usePruneInvalidCategoriesFromUrl,
} from '../lib';

import type { ReactNode } from 'react';

const baseEndpoint = Route.CATALOG;

export function CatalogPage(): ReactNode {
  const router = useRouter();
  const parseQueryParam = createParseQueryParam(router.query);
  const slugList = parseQueryParam('slug');
  const [priceFrom] = parseQueryParam('priceFrom');
  const [priceTo] = parseQueryParam('priceTo');
  const sizes = parseQueryParam('size');
  const doughs = parseQueryParam('dough');

  // categories
  const categoriesQuery = useCategoriesQuery();
  const categories = categoriesQuery.data?.results;
  const currentCategoryTree = useMemo(() => getCurrentCategoryTree({ categories, slugList }), [categories, slugList]);
  const categoriesBreadcrumbsProps = useMemo(
    () => createCategoriesBreadcrumbsProps({ category: currentCategoryTree, endpoint: baseEndpoint }),
    [currentCategoryTree]
  );
  const currentCategory = categoriesBreadcrumbsProps.at(-1);

  // filters
  const filters = useParseFilterOptions({
    categories: currentCategory ? [currentCategory.id] : [],
    doughs,
    price: { from: priceFrom, to: priceTo },
    sizes,
  });

  // breadcrumbs

  // validate+redirect
  usePruneInvalidCategoriesFromUrl({
    isReady: !categoriesQuery.isPending,
    getExpectedEndpoint: () => currentCategory?.href ?? baseEndpoint,
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

      <Catalog productProjectionSearchQueryVariables={{ limit: 50, offset: 0, filters }} />
    </>
  );
}
