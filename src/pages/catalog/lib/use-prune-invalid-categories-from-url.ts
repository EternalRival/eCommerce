import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { toastifyError } from '~/shared/lib/react-toastify';

export function usePruneInvalidCategoriesFromUrl({
  baseEndpoint,
  isReady,
  getCategoryEndpoint,
}: {
  baseEndpoint: string;
  isReady: boolean;
  getCategoryEndpoint: () => string;
}): void {
  const router = useRouter();

  useEffect(() => {
    if (isReady && router.isReady) {
      const expectedEndpoint = `${baseEndpoint}${getCategoryEndpoint()}`;

      if (router.asPath !== expectedEndpoint) {
        router.push(expectedEndpoint).catch(toastifyError);
      }
    }
  }, [baseEndpoint, getCategoryEndpoint, isReady, router]);
}
