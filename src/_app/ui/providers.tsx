import { UserStoreProvider } from '~/entities/user';
import { muiTheme } from '~/shared/model/mui-theme';

import { MuiProvider } from './mui.provider';
import { QueryProvider } from './query.provider';
import { ToastProvider } from './toast.provider';

import type { AppProps } from 'next/app';
import type { JSX, PropsWithChildren } from 'react';
import type { PageProps } from '../model';

type ProvidersProps<T> = Readonly<PropsWithChildren<{ appProps: AppProps<PageProps<T>> }>>;

export function Providers<T>({ children, appProps }: ProvidersProps<T>): JSX.Element {
  const { pageProps } = appProps;

  return (
    <ToastProvider>
      <QueryProvider
        dehydratedState={pageProps.dehydratedState}
        withDevTools
      >
        <UserStoreProvider>
          <MuiProvider {...{ appProps, theme: muiTheme }}>{children}</MuiProvider>
        </UserStoreProvider>
      </QueryProvider>
    </ToastProvider>
  );
}
