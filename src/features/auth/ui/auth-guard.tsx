import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { PageSpinner } from '~/entities/page-spinner';
import { useUserStore } from '~/entities/user';
import { toastifyError } from '~/shared/lib/react-toastify';
import { Route } from '~/shared/model/route.enum';

import type { JSX, PropsWithChildren } from 'react';

type AuthGuardProps = Readonly<
  PropsWithChildren<{
    shouldBeSignedIn?: boolean;
    redirectTo?: Route;
  }>
>;

export function AuthGuard({
  children,
  shouldBeSignedIn = false,
  redirectTo = Route.ROOT,
}: AuthGuardProps): JSX.Element {
  const { isEmpty, isCustomer } = useUserStore(({ token }) => ({
    isEmpty: token.type === 'empty',
    isCustomer: token.type === 'customer',
  }));

  const router = useRouter();

  const shouldRedirect = shouldBeSignedIn !== isCustomer;

  useEffect(() => {
    if (!isEmpty && shouldRedirect) {
      router.replace(redirectTo).catch(toastifyError);
    }
  }, [isEmpty, redirectTo, router, shouldRedirect]);

  const isAllowed = !isEmpty && !shouldRedirect;

  return (
    <>
      <PageSpinner isEnabled={!isAllowed} />
      {isAllowed && children}
    </>
  );
}
