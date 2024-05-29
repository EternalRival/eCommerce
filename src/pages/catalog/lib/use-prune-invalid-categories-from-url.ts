import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { toastifyError } from '~/shared/lib/react-toastify';

export function usePruneInvalidCategoriesFromUrl({
  isReady,
  getExpectedEndpoint,
}: {
  isReady: boolean;
  getExpectedEndpoint: () => string;
}): void {
  const router = useRouter();

  useEffect(() => {
    if (isReady && router.isReady) {
      const expectedEndpoint = getExpectedEndpoint();

      const [currentEndpoint, currentParams] = router.asPath.split('?');

      if (currentEndpoint !== expectedEndpoint) {
        let redirectUrl = expectedEndpoint;

        if (currentParams) {
          redirectUrl += `?${currentParams}`;
        }

        router.push(redirectUrl).catch(toastifyError);
      }
    }
  }, [getExpectedEndpoint, isReady, router]);
}
