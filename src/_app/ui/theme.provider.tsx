import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import type { ComponentProps, ReactNode } from 'react';

type Props = Readonly<ComponentProps<typeof MuiThemeProvider>>;

export function ThemeProvider({ children, theme }: Props): ReactNode {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
