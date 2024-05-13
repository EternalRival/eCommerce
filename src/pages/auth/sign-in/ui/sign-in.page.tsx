import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { SignInForm } from '~/features/auth';
import { toastifyError } from '~/shared/lib/react-toastify';
import { Route } from '~/shared/model/route.enum';
import { PageSpinner } from '~/entities/page-spinner';

import type { ReactNode } from 'react';

export function SignInPage(): ReactNode {
  const isCustomer = useAuthStore((store) => store.type === 'customer');
  const router = useRouter();

  useEffect(() => {
    if (isCustomer) {
      router.replace(Route.ROOT).catch(toastifyError);
    }
  }, [isCustomer, router]);

  return isCustomer ? (
    <PageSpinner />
  ) : (
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
