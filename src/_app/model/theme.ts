import { createTheme } from '@mui/material';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const theme = createTheme({
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
