import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import '~/_app/globals.css';

import { MuiProvider, QueryProvider, ThemeProvider, theme } from '~/_app';
import { siteTitle } from '~/shared/model/constants';

import type { DehydratedState } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

type PageProps = {
  dehydratedState?: DehydratedState;
};

export default function App<T extends PageProps>(props: AppProps<T>): ReactNode {
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
        <QueryProvider dehydratedState={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </QueryProvider>
      </ThemeProvider>
    </MuiProvider>
  );
}
