import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { PageSpinner } from '~/entities/page-spinner';
import { SignInForm } from '~/features/auth';
import { toastifyError } from '~/shared/lib/react-toastify';
import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';

export function SignInPage(): ReactNode {
  const auth = useAuthStore(({ type }) => ({ isPending: type === 'empty', isCustomer: type === 'customer' }));
  const router = useRouter();

  useEffect(() => {
    if (auth.isCustomer) {
      router.replace(Route.ROOT).catch(toastifyError);
    }
  }, [auth.isCustomer, router]);

  if (auth.isPending || auth.isCustomer) {
    return <PageSpinner />;
  }

  return (
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
  );
}
