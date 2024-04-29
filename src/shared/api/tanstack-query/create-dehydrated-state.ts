import { QueryClient, dehydrate } from '@tanstack/react-query';

import type { DehydratedState, FetchQueryOptions } from '@tanstack/react-query';

export async function createDehydratedState({
  queryKey,
  queryFn,
}: Required<Pick<FetchQueryOptions, 'queryKey' | 'queryFn'>>): Promise<DehydratedState> {
  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey,
    queryFn,
  });

  return dehydrate(client);
}
