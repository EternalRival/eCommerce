import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { Breadcrumbs } from '~/entities/breadcrumbs';
import { Catalog } from '~/features/catalog';
import { queryCategories } from '~/shared/api/commercetools';
import { toastifyError } from '~/shared/lib/react-toastify';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { Route } from '~/shared/model/route.enum';

import { createCategoriesBreadcrumbsProps, getCurrentCategories } from '../lib';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

export type CatalogPageProps = FCProps<{
  slug: string[];
}>;

const baseEndpoint = Route.CATALOG;

export function CatalogPage({ slug: slugList }: CatalogPageProps): ReactNode {
  // token
  const { token } = useAuthStore((store) => ({ token: store.access_token }));

  // categories
  const categoriesQuery = useQuery({
    queryKey: [QueryKey.CATEGORIES, token],
    queryFn: () => queryCategories(token),
  });
  const currentCategories = useMemo(
    () => getCurrentCategories({ categories: categoriesQuery.data?.results, slugList }),
    [categoriesQuery.data?.results, slugList]
  );

  // breadcrumbs
  const categoriesBreadcrumbsProps = useMemo(
    () => createCategoriesBreadcrumbsProps({ categories: currentCategories }),
    [currentCategories]
  );

  // validate+redirect
  const router = useRouter();
  useEffect(() => {
    if (!categoriesQuery.isPending && router.isReady) {
      const categoryEndpoint = categoriesBreadcrumbsProps.at(-1)?.href ?? '';
      const expectedEndpoint = `${baseEndpoint}${categoryEndpoint}`;

      if (router.asPath !== expectedEndpoint) {
        router.push(expectedEndpoint).catch(toastifyError);
      }
    }
  }, [categoriesBreadcrumbsProps, categoriesQuery.isPending, router]);

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
        isPending={slugList.length > 0 && categoriesQuery.isPending}
        breadcrumbsLinksProps={categoriesBreadcrumbsProps}
      />

      <Catalog />
    </>
  );
}
