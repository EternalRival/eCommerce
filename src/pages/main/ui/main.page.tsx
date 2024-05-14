import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';

function MainPageLink({ children, href }: FCPropsWC<{ href: Route }>): ReactNode {
  return (
    <Link
      component={NextLink}
      variant="button"
      href={href}
    >
      {children}
    </Link>
  );
}

export function MainPage(): ReactNode {
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Main Page
      </Typography>
      <Stack className="self-start">
        <MainPageLink href={Route.AUTH_SIGN_IN}>Sign in</MainPageLink>
        <MainPageLink href={Route.AUTH_SIGN_UP}>Sign up</MainPageLink>
        <MainPageLink href={Route.ROOT}>Home</MainPageLink>
        <MainPageLink href={Route.CATALOG}>Catalog</MainPageLink>
        <MainPageLink href={Route.PROFILE}>Profile</MainPageLink>
        <MainPageLink href={Route.CART}>Cart</MainPageLink>
        <MainPageLink href={Route.ABOUT}>About</MainPageLink>
      </Stack>
    </>
  );
}
