import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { getCategories } from '~/entities/products';
import { useUserStore } from '~/entities/user';
import { useParseQueryParam } from '~/shared/lib/nextjs';
import { parseUrl } from '~/shared/lib/parse-url';
import { toastifyError } from '~/shared/lib/react-toastify';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { Route } from '~/shared/model/route.enum';

export function usePruneInvalidCategoriesFromUrl(): void {
  const token = useUserStore((store) => store.token.access_token);
  const categoriesQuery = useQuery({
    queryKey: [QueryKey.CATEGORIES, token],
    queryFn() {
      return getCategories({ token });
    },
  });
  const router = useRouter();
  const { param: slugList } = useParseQueryParam('slug');

  const getExpectedEndpoint = useCallback(() => {
    let result: string = Route.CATALOG;

    let categories = categoriesQuery.data?.categories.results;

    const { length } = slugList;
    for (let i = 0; i < length; i += 1) {
      const currentCategory = categories?.find((category) => category.slug === slugList[i]);

      if (!currentCategory?.slug) {
        break;
      }

      result += `/${currentCategory.slug}`;

      categories = currentCategory.children;
    }

    return result;
  }, [categoriesQuery.data?.categories, slugList]);

  useEffect(() => {
    if (!categoriesQuery.isPending && router.isReady) {
      const currentUrl = parseUrl(router.asPath);
      const currentEndpoint = currentUrl.pathname;
      const expectedEndpoint = getExpectedEndpoint();

      if (currentEndpoint === expectedEndpoint) {
        return;
      }

      router.push({ ...currentUrl, pathname: expectedEndpoint }).catch(toastifyError);
    }
  }, [categoriesQuery.isPending, getExpectedEndpoint, router]);
}
