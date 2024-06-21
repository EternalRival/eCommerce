import { AuthStoreProvider } from '~/entities/auth-store';
import { muiTheme } from '~/shared/model/mui-theme';

import { MuiProvider } from './mui.provider';
import { QueryProvider } from './query.provider';
import { ToastProvider } from './toast.provider';

import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';
import type { PageProps } from '../model';

export function Providers<T>({ children, appProps }: FCPropsWC<{ appProps: AppProps<PageProps<T>> }>): ReactNode {
  const { pageProps } = appProps;

  return (
    <ToastProvider>
      <QueryProvider dehydratedState={pageProps.dehydratedState}>
        <AuthStoreProvider>
          <MuiProvider {...{ appProps, theme: muiTheme }}>{children}</MuiProvider>
        </AuthStoreProvider>
      </QueryProvider>
    </ToastProvider>
  );
}
