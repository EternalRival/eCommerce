import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { toastifyError } from '~/shared/lib/react-toastify';

import type { QueryCategoriesReturn } from '~/shared/api/commercetools';

type Category = QueryCategoriesReturn['results'][number];

type Props = {
  baseEndpoint: string;
  categoriesBreadcrumbsProps: Category[];
  isReady: boolean;
};

export function usePruneCategoriesEndpoint({ baseEndpoint, categoriesBreadcrumbsProps, isReady }: Props): void {
  const router = useRouter();

  useEffect(() => {
    if (isReady && router.isReady) {
      const endpoint = categoriesBreadcrumbsProps.reduce<string>(
        (acc, item) => `${acc}/${item.slug ?? ''}`,
        baseEndpoint
      );

      if (router.asPath !== endpoint) {
        router.replace(endpoint).catch(toastifyError);
      }
    }
  }, [baseEndpoint, categoriesBreadcrumbsProps, isReady, router]);
}
