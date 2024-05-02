import { AuthStoreProvider } from '~/entities/auth-store';

import { theme } from '../model';
import { MuiProvider } from './mui.provider';
import { QueryProvider } from './query.provider';

import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';
import type { DehydratedStateProps } from './query.provider';

type Props = FCPropsWC<{ appProps: AppProps<DehydratedStateProps> }>;

export function Providers({ children, appProps }: Props): ReactNode {
  const { pageProps } = appProps;

  return (
    <QueryProvider dehydratedState={pageProps.dehydratedState}>
      <AuthStoreProvider>
        <MuiProvider {...{ appProps, theme }}>{children}</MuiProvider>
      </AuthStoreProvider>
    </QueryProvider>
  );
}
