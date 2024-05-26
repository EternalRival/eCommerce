import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import NextLink from 'next/link';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

export type BreadcrumbsLinkProps = {
  id: string;
  href: string;
  label: string;
};

type Props = FCProps<{
  isPending?: boolean;
  breadcrumbsLinksProps: BreadcrumbsLinkProps[];
}>;

export function Breadcrumbs({ isPending, breadcrumbsLinksProps }: Props): ReactNode {
  if (isPending) {
    return <Skeleton />;
  }

  return breadcrumbsLinksProps.length < 1 ? null : (
    <MuiBreadcrumbs>
      {breadcrumbsLinksProps.map(({ id, href, label }) => (
        <Link
          key={id}
          component={NextLink}
          href={href}
        >
          {label}
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
}
