import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

type Props = AppProps;

export function App({ Component, pageProps }: Props): ReactNode {
  return <Component {...pageProps} />;
}
