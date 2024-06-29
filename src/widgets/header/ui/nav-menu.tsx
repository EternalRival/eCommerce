import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';

import { PageSpinner } from '~/entities/page-spinner';
import { useUserStore } from '~/entities/user';
import { useSignOut } from '~/features/auth';
import { Route } from '~/shared/model/route.enum';

import type { FC } from 'react';

export function NavMenu(): JSX.Element {
  const { type } = useUserStore((store) => ({ type: store.token.type }));
  const router = useRouter();
  const { isPending: isSignOutPending, signOut } = useSignOut();

  const createNavigate = (route: Route) => (): void => void router.push(route);

  const buttonPropsList: Nullable<{ label: string; onClick?: () => void; Icon: FC }>[] = [
    { label: 'Home', onClick: createNavigate(Route.ROOT), Icon: HomeIcon },
    { label: 'Catalog', onClick: createNavigate(Route.CATALOG), Icon: ViewModuleIcon },
    { label: 'Cart', onClick: createNavigate(Route.CART), Icon: ShoppingCartIcon },
    { label: 'About', onClick: createNavigate(Route.ABOUT), Icon: InfoIcon },
    {
      empty: null,
      guest: { label: 'Sign up', onClick: createNavigate(Route.AUTH_SIGN_UP), Icon: PersonAddIcon },
      customer: { label: 'Profile', onClick: createNavigate(Route.PROFILE), Icon: AccountCircleIcon },
    }[type],
    {
      empty: null,
      guest: { label: 'Sign in', onClick: createNavigate(Route.AUTH_SIGN_IN), Icon: LoginIcon },
      customer: { label: 'Sign out', onClick: (): void => void signOut(), Icon: LogoutIcon },
    }[type],
  ];

  return (
    <>
      <PageSpinner isEnabled={isSignOutPending} />
      {buttonPropsList.map((buttonProps, i) =>
        buttonProps ? (
          <Tooltip
            key={buttonProps.label}
            title={buttonProps.label}
            arrow
          >
            <IconButton
              color="inherit"
              onClick={buttonProps.onClick}
            >
              <buttonProps.Icon />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton
            key={i}
            color="inherit"
          >
            <CircularProgress
              size={24}
              color="inherit"
            />
          </IconButton>
        )
      )}
    </>
  );
}
