import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import type { ReactNode } from 'react';

type Props<T> = Readonly<{
  children: ReactNode;
  appProps: T;
}>;

export function MuiProvider<T>({ children, appProps }: Props<T>): ReactNode {
  return (
    <AppCacheProvider {...appProps}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
    </AppCacheProvider>
  );
}
