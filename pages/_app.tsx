import '@/_app/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';

import { MuiProvider, ThemeProvider, theme } from '@/_app';
import { siteTitle } from '@/shared/model/constants';

import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

export default function App<T>(props: AppProps<T>): ReactNode {
  const { Component, pageProps } = props;

  return (
    <MuiProvider appProps={props}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
        <title>{siteTitle}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </MuiProvider>
  );
}
