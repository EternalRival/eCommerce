import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import type { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';

type Props = FCPropsWC<{ appProps: AppProps } & ThemeProviderProps>;

export function MuiProvider({ appProps, children, theme }: Props): ReactNode {
  return (
    <AppCacheProvider {...appProps}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline>{children}</CssBaseline>
        </ThemeProvider>
      </LocalizationProvider>
    </AppCacheProvider>
  );
}
