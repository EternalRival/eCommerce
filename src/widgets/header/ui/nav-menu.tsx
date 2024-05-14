import { useRouter } from 'next/router';

import { Route } from '~/shared/model/route.enum';

import { HeaderButton } from './header-button';

import type { ReactNode } from 'react';

export function NavMenu(): ReactNode {
  const router = useRouter();

  const navigate = (route: Route) => (): void => void router.push(route);

  return (
    <>
      <HeaderButton onClick={navigate(Route.ROOT)}>Home</HeaderButton>
      <HeaderButton onClick={navigate(Route.CATALOG)}>Catalog</HeaderButton>
      <HeaderButton onClick={navigate(Route.CART)}>Cart</HeaderButton>
      <HeaderButton onClick={navigate(Route.ABOUT)}>About</HeaderButton>
    </>
  );
}
