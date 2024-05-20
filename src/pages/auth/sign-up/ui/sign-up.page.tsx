import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AuthGuard, SignUpForm } from '~/features/auth';

import type { ReactNode } from 'react';

export function SignUpPage(): ReactNode {
  return (
    <AuthGuard>
      <Stack className="grow items-center justify-center">
        <Typography
          component="h1"
          variant="h5"
          className="p-2"
        >
          Sign up
        </Typography>
        <SignUpForm />
      </Stack>
    </AuthGuard>
  );
}
