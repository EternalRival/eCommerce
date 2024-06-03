import { useRouter } from 'next/router';

export function useParseQueryParam(key: string): { isReady: boolean; param: string[] } {
  const { isReady, query } = useRouter();
  const param = query[key];

  return { isReady, param: typeof param === 'string' ? [param] : param ?? [] };
}
