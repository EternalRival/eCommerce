import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import type { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import type { ReactNode } from 'react';

export function ThemeProvider({ children, theme }: ThemeProviderProps): ReactNode {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
