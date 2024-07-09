import Link from '@mui/material/Link';
import NextLink from 'next/link';

import { Route } from '~/shared/model/route.enum';

import type { JSX } from 'react';

export function Logo(): JSX.Element {
  return (
    <Link
      component={NextLink}
      variant="button"
      href={Route.ROOT}
      color="primary.contrastText"
      className="no-underline"
    >
      ER-Shop
    </Link>
  );
}
