import { createTheme } from '@mui/material';

import { roboto } from './next-fonts';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#2E628C',
    },
    secondary: {
      main: '#51606F',
    },
    error: {
      main: '#BA1A1A',
    },
    info: {
      main: '#68587a',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
