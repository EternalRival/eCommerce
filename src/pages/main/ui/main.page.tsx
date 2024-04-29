import NextLink from 'next/link';
import { Link } from '@mui/material';

import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';

export function MainPage(): ReactNode {
  return (
    <>
      <h1 className="border border-black">Main Page</h1>
      <Link
        component={NextLink}
        href={Route.AUTH_SIGN_IN}
        variant="button"
      >
        Sign in
      </Link>{' '}
      <Link
        component={NextLink}
        href={Route.AUTH_SIGN_UP}
        variant="button"
      >
        Sign up
      </Link>
    </>
  );
}
