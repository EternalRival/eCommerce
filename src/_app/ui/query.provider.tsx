import { useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { ReactNode } from 'react';
import type { DehydratedState, QueryClientConfig } from '@tanstack/react-query';

type Props = Readonly<{
  children: ReactNode;
  dehydratedState: Optional<DehydratedState>;
}>;

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};

export function QueryProvider({ children, dehydratedState }: Props): ReactNode {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
