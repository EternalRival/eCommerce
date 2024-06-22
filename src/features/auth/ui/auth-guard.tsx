import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { PageSpinner } from '~/entities/page-spinner';
import { toastifyError } from '~/shared/lib/react-toastify';
import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';

type Props = FCPropsWC<{
  shouldBeSignedIn?: boolean;
  redirectTo?: Route;
}>;

export function AuthGuard({ children, shouldBeSignedIn = false, redirectTo = Route.ROOT }: Props): ReactNode {
  const { isPending, isCustomer } = useAuthStore(({ type }) => ({
    isPending: type === 'empty',
    isCustomer: type === 'customer',
  }));

  const router = useRouter();

  const shouldRedirect = shouldBeSignedIn !== isCustomer;

  useEffect(() => {
    if (!isPending && shouldRedirect) {
      router.replace(redirectTo).catch(toastifyError);
    }
  }, [isPending, redirectTo, router, shouldRedirect]);

  if (isPending || shouldRedirect) {
    return <PageSpinner />;
  }

  return children;
}
