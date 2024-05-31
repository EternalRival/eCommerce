import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { Catalog , CategoryBreadcrumbs } from '~/features/catalog';
import { createParseQueryParam } from '~/shared/lib/nextjs';
import { Route } from '~/shared/model/route.enum';

import { createCategoriesBreadcrumbsProps, useCategoriesQuery, useParseFilterOptions } from '../lib';

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

  // breadcrumbs
  const categoriesBreadcrumbsProps = useMemo(
    () => createCategoriesBreadcrumbsProps({ categories: categories ?? [], slugList, endpoint: baseEndpoint }),
    [categories, slugList]
  );
  const currentCategory = categoriesBreadcrumbsProps.at(-1);

  // filters
  const filters = useParseFilterOptions({
    categories: currentCategory ? [currentCategory.id] : [],
    doughs,
    price: { from: priceFrom, to: priceTo },
    sizes,
  });

  // validate+redirect
  // usePruneInvalidCategoriesFromUrl({
  //   isReady: !categoriesQuery.isPending,
  //   getExpectedEndpoint: () => currentCategory?.href ?? baseEndpoint,
  // });

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

      <Catalog
        categories={categories ?? []}
        categoriesIsPending={categoriesQuery.isPending}
        productProjectionSearchQueryVariables={{ limit: 50, offset: 0, filters }}
      />
    </>
  );
}
