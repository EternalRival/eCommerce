import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

import { useAuthStore } from '~/entities/auth-store';
import { useSignOut } from '~/features/auth';
import { Route } from '~/shared/model/route.enum';

import { HeaderButton } from './header-button';

import type { ReactNode } from 'react';

export function ProfileButtons(): ReactNode {
  const isCustomer = useAuthStore((store) => store.type === 'customer');
  const signOut = useSignOut();
  const router = useRouter();
  const navigate = (route: Route) => (): void => void router.push(route);

  return isCustomer ? (
    <Box>
      <HeaderButton onClick={navigate(Route.PROFILE)}>Profile</HeaderButton>
      <HeaderButton onClick={signOut}>Sign out</HeaderButton>
    </Box>
  ) : (
    <Box>
      <HeaderButton onClick={navigate(Route.AUTH_SIGN_UP)}>Sign up</HeaderButton>
      <HeaderButton onClick={navigate(Route.AUTH_SIGN_IN)}>Sign in</HeaderButton>
    </Box>
  );
}
