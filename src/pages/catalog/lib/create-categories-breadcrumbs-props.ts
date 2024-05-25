import type { QueryCategoriesReturn } from '~/shared/api/commercetools';

type Category = QueryCategoriesReturn['results'][number];

export function createCategoriesBreadcrumbsProps(slug: string[], categories: Maybe<Category[]>): Category[] {
  const result: Category[] = [];

  if (categories) {
    const { length } = slug;
    for (let i = 0; i < length; i += 1) {
      const currentCategory = categories.find((category) => category.slug === slug[i]);

      if (!currentCategory || currentCategory.parent?.slug !== result.at(-1)?.slug) {
        break;
      }

      result.push(currentCategory);
    }
  }

  return result;
}
