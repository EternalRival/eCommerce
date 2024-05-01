import MuiThemeProvider from '@mui/material/styles/ThemeProvider';

import type { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import type { ReactNode } from 'react';

export function ThemeProvider({ children, theme }: Readonly<ThemeProviderProps>): ReactNode {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
