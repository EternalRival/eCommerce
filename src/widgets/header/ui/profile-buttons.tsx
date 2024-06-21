import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';

import { useAuthStore } from '~/entities/auth-store';
import { PageSpinner } from '~/entities/page-spinner';
import { useSignOut } from '~/features/auth';
import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

function ProfileButtonsSkeleton({ arrayLength }: FCProps<{ arrayLength: number }>): ReactNode {
  return Array.from({ length: arrayLength }, (_, i) => (
    <IconButton
      key={i}
      color="inherit"
    >
      <CircularProgress
        size={24}
        color="inherit"
      />
    </IconButton>
  ));
}

export function ProfileButtons(): ReactNode {
  const auth = useAuthStore((store) => store);
  const router = useRouter();

  const { signOut, isPending: isSignOutPending } = useSignOut();

  if (auth.type === 'empty') {
    return <ProfileButtonsSkeleton arrayLength={2} />;
  }

  const createNavigate = (route: Route) => (): void => void router.push(route);

  const customerButtonsProps = [
    ['Profile', createNavigate(Route.PROFILE), AccountCircleIcon],
    ['Sign out', (): void => void signOut(), LogoutIcon],
  ] as const;
  const guestButtonsProps = [
    ['Sign up', createNavigate(Route.AUTH_SIGN_UP), PersonAddIcon],
    ['Sign in', createNavigate(Route.AUTH_SIGN_IN), LoginIcon],
  ] as const;

  return (
    <>
      {isSignOutPending && <PageSpinner />}
      {(auth.type === 'guest' ? guestButtonsProps : customerButtonsProps).map(([title, onClick, Icon]) => (
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
      ))}
    </>
  );
}
