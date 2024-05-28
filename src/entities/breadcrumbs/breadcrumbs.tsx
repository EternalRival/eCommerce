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
  baseEndpoint: string;
  baseEndpointLabel: ReactNode;
  isPending?: boolean;
  breadcrumbsLinksProps: BreadcrumbsLinkProps[];
}>;

export function Breadcrumbs({ baseEndpoint, baseEndpointLabel, isPending, breadcrumbsLinksProps }: Props): ReactNode {
  if (isPending) {
    return <Skeleton />;
  }

  return breadcrumbsLinksProps.length < 1 ? null : (
    <MuiBreadcrumbs>
      <Link
        key="home"
        component={NextLink}
        href={baseEndpoint}
        className="flex"
      >
        {baseEndpointLabel}
      </Link>
      {breadcrumbsLinksProps.map(({ id, href, label }) => (
        <Link
          key={id}
          component={NextLink}
          href={`${baseEndpoint}${href}`}
        >
          {label}
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
}
