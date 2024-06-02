import { useParseQueryParam } from '~/shared/lib/nextjs';

import { categoryParamKey } from './constants';
import { useCategoriesQuery } from './use-categories-query';

import type { QueryCategoriesReturn } from './use-categories-query';

type Category = QueryCategoriesReturn['categories'][number];

const getCurrentCategory = ({
  slugList,
  categories,
}: {
  slugList: string[];
  categories?: Category[];
}): Nullable<Category> => {
  const currentCategory = categories?.find((category) => category.slug === slugList[0]);

  if (!currentCategory) {
    return null;
  }

  return getCurrentCategory({ slugList: slugList.slice(1), categories: currentCategory.children }) ?? currentCategory;
};

export function useCurrentCategory({ token }: { token: Maybe<string> }): {
  isPending: boolean;
  currentCategory: Nullable<Category>;
} {
  const { isReady, param: slugList } = useParseQueryParam(categoryParamKey);
  const categoriesQuery = useCategoriesQuery({ token });
  const categories = categoriesQuery.data?.categories;

  return {
    isPending: !isReady || categoriesQuery.isPending,
    currentCategory: getCurrentCategory({ slugList, categories }),
  };
}
