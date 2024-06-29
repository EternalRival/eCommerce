import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';

import 'react-toastify/dist/ReactToastify.min.css';
import { Layout, Providers } from '~/_app';
import '~/_app/globals.css';
import { InternalServerErrorPage } from '~/pages/internal-server-error';
import { SITE_TITLE } from '~/shared/model/constants';

import type { AppProps } from 'next/app';
import type { PageProps } from '~/_app';

export default function App<T>(appProps: AppProps<PageProps<T>>): JSX.Element {
  const { Component, pageProps } = appProps;

  return (
    <ErrorBoundary fallback={<InternalServerErrorPage />}>
      <Providers appProps={appProps}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
          <title>{SITE_TITLE}</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </ErrorBoundary>
  );
}
