import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import NextLink from 'next/link';
import { useMemo } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { useCategoriesQuery } from '~/entities/categories';
import { useParseQueryParam } from '~/shared/lib/nextjs';
import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';
import type { Category } from '~/entities/categories';

function createLinkProps({
  baseUrl,
  categories,
  slugList,
}: {
  baseUrl: string;
  slugList: string[];
  categories?: Category[];
}): { id: string; href: string; name: string }[] {
  const currentCategory = categories?.find((category) => category.slug === slugList[0]);

  if (!currentCategory || !currentCategory.slug || !currentCategory.name) {
    return [];
  }

  const { id, name, slug } = currentCategory;
  const href = `${baseUrl}/${slug}`;

  return [
    { id, name, href },
    ...createLinkProps({ baseUrl: href, categories: currentCategory.children, slugList: slugList.slice(1) }),
  ];
}

export function CategoryBreadcrumbs(): ReactNode {
  const baseUrl = Route.CATALOG;
  const token = useAuthStore((store) => store.access_token);
  const { data: categories, isPending } = useCategoriesQuery({ token });
  const slugList = useParseQueryParam('slug');

  const linkProps = useMemo(() => createLinkProps({ baseUrl, categories, slugList }), [baseUrl, categories, slugList]);

  if (isPending) {
    return <Skeleton />;
  }

  return (
    <Collapse in={linkProps.length > 0}>
      <Breadcrumbs>
        <Link
          key={baseUrl}
          component={NextLink}
          href={baseUrl}
          display="flex"
        >
          <ViewModuleIcon />
        </Link>
        {linkProps.map(({ id, href, name }) => (
          <Link
            key={id}
            component={NextLink}
            href={href}
          >
            {name}
          </Link>
        ))}
      </Breadcrumbs>
    </Collapse>
  );
}
