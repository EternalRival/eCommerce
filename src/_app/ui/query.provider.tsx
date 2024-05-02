import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import type { DehydratedState, QueryClientConfig } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';

export type DehydratedStateProps = { dehydratedState?: DehydratedState };

type Props = FCPropsWC<DehydratedStateProps>;

const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};

export function QueryProvider({ children, dehydratedState }: Props): ReactNode {
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_CONFIG));

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
