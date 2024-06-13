import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';

export function InternalServerErrorPage(): ReactNode {
  return (
    <Stack className="grow items-center justify-center">
      <Typography
        component="h1"
        variant="h5"
        className="p-2"
      >
        Something went wrong...
      </Typography>
      <Typography
        component="p"
        variant="body1"
        className="p-2"
      >
        Try to reload page or{' '}
        <Link
          component={NextLink}
          href={Route.ROOT}
        >
          return to the main page
        </Link>
      </Typography>
    </Stack>
  );
}
