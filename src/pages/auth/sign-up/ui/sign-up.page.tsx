import { Box, Container, Typography } from '@mui/material';

import { SignUpForm } from '~/features/auth/ui';

import type { ReactNode } from 'react';

export function SignUpPage(): ReactNode {
  return (
    <Container component="main">
      <Box className="flex min-h-dvh flex-col items-center justify-center">
        <Typography
          component="h1"
          variant="h5"
        >
          Sign up
        </Typography>
        <SignUpForm />
      </Box>
    </Container>
  );
}
