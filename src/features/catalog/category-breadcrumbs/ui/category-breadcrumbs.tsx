import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';

import { getCategories } from '~/entities/products';
import { useUserStore } from '~/entities/user';
import { useParseQueryParam } from '~/shared/lib/nextjs';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { Route } from '~/shared/model/route.enum';

import { createLinkProps } from '../lib';

export function CategoryBreadcrumbs(): JSX.Element {
  const baseUrl = Route.CATALOG;
  const token = useUserStore((store) => store.token.access_token);
  const { data, isPending } = useQuery({
    queryKey: [QueryKey.CATEGORIES, token],
    queryFn() {
      return getCategories({ token });
    },
  });
  const { param: slugList } = useParseQueryParam('slug');

  const categories = data?.categories.results;
  const linkProps = createLinkProps({ baseUrl, categories, slugList });

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
