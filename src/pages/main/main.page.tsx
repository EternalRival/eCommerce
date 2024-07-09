import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

import { Route } from '~/shared/model/route.enum';

import type { JSX } from 'react';

export function MainPage(): JSX.Element {
  const linkPropsList = [
    { href: Route.AUTH_SIGN_IN, label: 'Sign in' },
    { href: Route.AUTH_SIGN_UP, label: 'Sign up' },
    { href: Route.ROOT, label: 'Home' },
    { href: Route.CATALOG, label: 'Catalog' },
    { href: Route.PROFILE, label: 'Profile' },
    { href: Route.CART, label: 'Cart' },
    { href: Route.ABOUT, label: 'About' },
  ];

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
        {linkPropsList.map(({ href, label }) => (
          <Link
            key={`${href} - ${label}`}
            component={NextLink}
            variant="button"
            href={href}
          >
            {label}
          </Link>
        ))}
      </Stack>
    </>
  );
}
