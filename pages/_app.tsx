import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import '~/_app/globals.css';

import { Providers } from '~/_app';
import { StorePreview } from '~/features/store-preview';
import { siteTitle } from '~/shared/model/constants';

import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import type { DehydratedStateProps } from '~/_app';

export default function App<T>(appProps: AppProps<T & DehydratedStateProps>): ReactNode {
  const { Component, pageProps } = appProps;

  return (
    <Providers appProps={appProps}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
        <title>{siteTitle}</title>
      </Head>
      <StorePreview />
      <Component {...pageProps} />
    </Providers>
  );
}
