import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';

import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';

export function NavMenu(): ReactNode {
  const router = useRouter();

  const createNavigate = (route: Route) => (): void => void router.push(route);

  const buttonsProps = [
    ['Home', createNavigate(Route.ROOT), HomeIcon],
    ['Catalog', createNavigate(Route.CATALOG), ViewModuleIcon],
    ['Cart', createNavigate(Route.CART), ShoppingCartIcon],
    ['About', createNavigate(Route.ABOUT), InfoIcon],
  ] as const;

  return (
    <>
      {buttonsProps.map(([title, onClick, Icon]) => (
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
