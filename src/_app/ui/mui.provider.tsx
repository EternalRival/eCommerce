import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';

import type { ReactNode } from 'react';

type Props<T> = Readonly<{
  children: ReactNode;
  appProps: T;
}>;

export function MuiProvider<T>({ children, appProps }: Props<T>): ReactNode {
  return <AppCacheProvider {...appProps}>{children}</AppCacheProvider>;
}
