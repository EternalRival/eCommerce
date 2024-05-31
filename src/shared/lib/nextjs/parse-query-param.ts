import { useRouter } from 'next/router';

import type { ParsedUrlQuery } from 'querystring';

export function createParseQueryParam(parsedUrlQuery: ParsedUrlQuery) {
  return (key: string): string[] => {
    const param = parsedUrlQuery[key];

    return typeof param === 'string' ? [param] : param ?? [];
  };
}

export function useParseQueryParam(key: string): string[] {
  const { query } = useRouter();
  const param = query[key];

  return typeof param === 'string' ? [param] : param ?? [];
}
