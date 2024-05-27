import { createTheme } from '@mui/material';

import { roboto } from './next-fonts';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#904b3c',
    },
    secondary: {
      main: '#775750',
    },
    error: {
      main: '#ba1a1a',
    },
    info: {
      main: '#6e5d2e',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
