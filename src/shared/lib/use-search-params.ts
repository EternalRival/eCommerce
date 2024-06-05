import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { parseUrl } from './parse-url';

export function useSearchParams(): {
  searchParams: URLSearchParams;
  updateUrl: (options?: { method?: 'push' | 'replace'; scroll?: boolean }) => Promise<boolean>;
} {
  const router = useRouter();

  return useMemo(() => {
    const parsedUrl = parseUrl(router.asPath);
    const params = new URLSearchParams(parsedUrl.search);
    const defaultUpdateFnOptions = { method: 'push', scroll: true } as const;

    return {
      searchParams: params,
      updateUrl({
        method = defaultUpdateFnOptions.method,
        scroll = defaultUpdateFnOptions.scroll,
      } = defaultUpdateFnOptions): Promise<boolean> {
        const url = { ...parsedUrl, search: params.toString() };

        return router[method](url, url, { scroll });
      },
    };
  }, [router]);
}
