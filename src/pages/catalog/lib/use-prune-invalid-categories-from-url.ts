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

      const [currentEndpoint, currentParams] = router.asPath.split('?');

      if (currentEndpoint !== expectedEndpoint) {
        let redirectUrl = expectedEndpoint;

        if (currentParams) {
          redirectUrl += `?${currentParams}`;
        }

        router.push(redirectUrl).catch(toastifyError);
      }
    }
  }, [baseEndpoint, getCategoryEndpoint, isReady, router]);
}
