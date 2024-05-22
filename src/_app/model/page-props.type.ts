import type { DehydratedState } from '@tanstack/react-query';

export type PageProps<T = unknown> = T & {
  dehydratedState: DehydratedState;
};
