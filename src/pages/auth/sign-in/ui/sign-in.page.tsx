import { Box, Container, Typography } from '@mui/material';

import { SignInForm } from '~/features/auth';

import type { ReactNode } from 'react';

export function SignInPage(): ReactNode {
  return (
    <Container component="main">
      <Box className="flex min-h-dvh flex-col items-center justify-center">
        <Typography
          component="h1"
          variant="h5"
          className="p-2"
        >
          Sign in
        </Typography>
        <SignInForm />
      </Box>
    </Container>
  );
}
