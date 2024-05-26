import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { Breadcrumbs } from '~/entities/breadcrumbs';
import { Catalog } from '~/features/catalog';
import { toastifyError } from '~/shared/lib/react-toastify';
import { Route } from '~/shared/model/route.enum';

import { createCategoriesBreadcrumbsProps, useCategories } from '../lib';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

export type CatalogPageProps = FCProps<{
  slug: string[];
}>;

const baseEndpoint = Route.CATALOG;

export function CatalogPage({ slug: slugList }: CatalogPageProps): ReactNode {
  const { data: categories, isPending } = useCategories();

  const categoriesBreadcrumbsProps = useMemo(
    () => (categories ? createCategoriesBreadcrumbsProps({ baseEndpoint, categories, slugList }) : []),
    [categories, slugList]
  );

  const router = useRouter();
  useEffect(() => {
    if (!isPending && router.isReady) {
      const endpoint = categoriesBreadcrumbsProps.at(-1)?.href ?? baseEndpoint;

      if (router.asPath !== endpoint) {
        router.push(endpoint).catch(toastifyError);
      }
    }
  }, [categoriesBreadcrumbsProps, isPending, router]);

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
        isPending={slugList.length > 0 && isPending}
        breadcrumbsLinksProps={categoriesBreadcrumbsProps}
      />

      <Box>
        <Catalog />
      </Box>
    </>
  );
}
