import { Backdrop, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

import { useAuthStore } from '~/entities/auth-store';
import { Route } from '~/shared/model/route.enum';
import { toastifyError } from '~/shared/lib/react-toastify';

import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';

export function AuthGuard({ children }: FCPropsWC): ReactNode {
  const router = useRouter();
  const isLogged = useAuthStore((store) => store.type === 'customer');

  if (isLogged && Object.is(router.route, Route.AUTH_SIGN_IN)) {
    router.replace(Route.ROOT).catch(toastifyError);

    return (
      <Backdrop
        open
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        className="bg-transparent backdrop-blur-sm"
      >
        <CircularProgress />
      </Backdrop>
    );
  }

  return children;
}
