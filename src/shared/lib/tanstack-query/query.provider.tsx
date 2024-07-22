import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import type { JSX, PropsWithChildren } from 'react';
import type { DehydratedState, QueryClientConfig } from '@tanstack/react-query';

type DehydratedStateProps = { dehydratedState?: DehydratedState };

type QueryProviderProps = Readonly<PropsWithChildren<DehydratedStateProps> & { withDevTools?: boolean }>;

const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};

export function QueryProvider({ children, dehydratedState, withDevTools }: QueryProviderProps): JSX.Element {
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_CONFIG));

  return (
    <QueryClientProvider client={queryClient}>
      {withDevTools && <ReactQueryDevtools initialIsOpen={false} />}
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}