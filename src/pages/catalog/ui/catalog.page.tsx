import Box from '@mui/material/Box';
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

import { createCategoriesBreadcrumbsProps } from '../lib';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

export type CatalogPageProps = FCProps<{
  slug: string[];
}>;

const baseEndpoint = Route.CATALOG;

export function CatalogPage({ slug: slugList }: CatalogPageProps): ReactNode {
  const { token } = useAuthStore((store) => ({ token: store.access_token }));

  const categoriesQuery = useQuery({
    queryKey: [QueryKey.CATEGORIES, token],
    queryFn: () => queryCategories(token),
  });

  const categoriesBreadcrumbsProps = useMemo(
    () => createCategoriesBreadcrumbsProps({ baseEndpoint, categories: categoriesQuery.data?.results, slugList }),
    [categoriesQuery.data, slugList]
  );

  const router = useRouter();
  useEffect(() => {
    if (!categoriesQuery.isPending && router.isReady) {
      const endpoint = categoriesBreadcrumbsProps.at(-1)?.href ?? baseEndpoint;

      if (router.asPath !== endpoint) {
        router.push(endpoint).catch(toastifyError);
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
        isPending={slugList.length > 0 && categoriesQuery.isPending}
        breadcrumbsLinksProps={categoriesBreadcrumbsProps}
      />

      <Box>
        <Catalog />
      </Box>
    </>
  );
}
