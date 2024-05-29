import type { Category, QueryCategoriesReturn } from '~/shared/api/commercetools';

type Categories = QueryCategoriesReturn['results'];

type Props = {
  categories?: Categories;
  slugList: string[];
};

export function getCurrentCategory({ categories, slugList }: Props): Nullable<Category> {
  const category = categories?.find(({ slug }) => slug === slugList[0]);

  if (!category) {
    return null;
  }

  const child = getCurrentCategory({ categories: category.children, slugList: slugList.slice(1) });

  return { ...category, children: child ? [child] : [] };
}
