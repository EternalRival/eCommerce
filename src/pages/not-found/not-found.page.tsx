import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

import { Route } from '~/shared/model/route.enum';

import type { JSX } from 'react';

export function NotFoundPage(): JSX.Element {
  return (
    <Stack className="grow items-center justify-center">
      <Typography
        component="h1"
        variant="h5"
        className="p-2"
      >
        Requested page could not be found
      </Typography>
      <Link
        component={NextLink}
        href={Route.ROOT}
      >
        Return to the main page
      </Link>
    </Stack>
  );
}
