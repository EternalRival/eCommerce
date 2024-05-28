import type { QueryCategoriesReturn } from '~/shared/api/commercetools';

type Categories = QueryCategoriesReturn['results'];

type Props = {
  categories?: Categories;
  slugList: string[];
};

export function getCurrentCategories({ categories, slugList }: Props): Categories {
  if (!categories || categories.length < 1) {
    return [];
  }

  const result: Categories = [];
  const slugLength = slugList.length;

  for (let i = 0; i < slugLength; i += 1) {
    const currentCategory = categories.find((category) => category.slug === slugList[i]);

    if (!currentCategory || currentCategory.parent?.slug !== result.at(-1)?.slug) {
      break;
    }

    result.push(currentCategory);
  }

  return result;
}
