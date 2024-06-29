import type { Category } from '../model';

export const getCurrentCategory = ({
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
