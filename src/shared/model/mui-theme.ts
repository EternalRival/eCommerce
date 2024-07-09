import { createTheme } from '@mui/material';

import { roboto } from './next-fonts';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d32f2f',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#1976d2',
    },
    success: {
      main: '#388e3c',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
    text: {
      primary: '#2e7d32',
      secondary: '#757575',
      disabled: '#9e9e9e',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
