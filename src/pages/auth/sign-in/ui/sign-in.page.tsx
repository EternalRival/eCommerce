import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AuthGuard, SignInForm } from '~/features/auth';

import type { ReactNode } from 'react';

export function SignInPage(): ReactNode {
  return (
    <AuthGuard>
      <Stack className="grow items-center justify-center">
        <Typography
          component="h1"
          variant="h5"
          className="p-2"
        >
          Sign in
        </Typography>
        <SignInForm />
      </Stack>
    </AuthGuard>
  );
}
