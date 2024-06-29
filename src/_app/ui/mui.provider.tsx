import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import type { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import type { AppProps } from 'next/app';
import type { PropsWithChildren } from 'react';

type MuiProviderProps = Readonly<PropsWithChildren<{ appProps: AppProps } & ThemeProviderProps>>;

export function MuiProvider({ appProps, children, theme }: MuiProviderProps): JSX.Element {
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
