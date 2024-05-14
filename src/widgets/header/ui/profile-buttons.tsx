import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';

import { useAuthStore } from '~/entities/auth-store';
import { useSignOut } from '~/features/auth';
import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';

export function ProfileButtons(): ReactNode {
  const isCustomer = useAuthStore((store) => store.type === 'customer');
  const signOut = useSignOut();
  const router = useRouter();
  const createNavigate = (route: Route) => (): void => void router.push(route);

  const customerButtonsProps = [
    ['Profile', createNavigate(Route.PROFILE), AccountCircleIcon],
    ['Sign out', signOut, LogoutIcon],
  ] as const;
  const anonymousButtonsProps = [
    ['Sign up', createNavigate(Route.AUTH_SIGN_UP), PersonAddIcon],
    ['Sign in', createNavigate(Route.AUTH_SIGN_IN), LoginIcon],
  ] as const;

  return (isCustomer ? customerButtonsProps : anonymousButtonsProps).map(([title, onClick, Icon]) => (
    <Tooltip
      key={title}
      title={title}
      arrow
    >
      <IconButton
        color="inherit"
        onClick={onClick}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  ));
}
