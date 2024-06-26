import { createTheme } from '@mui/material';

import { roboto } from './next-fonts';

const rootElement = typeof document === 'undefined' ? null : document.getElementById('__next');

export const muiTheme = createTheme({
  components: {
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
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
