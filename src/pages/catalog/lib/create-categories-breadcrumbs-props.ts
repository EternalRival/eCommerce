import type { BreadcrumbsLinkProps } from '~/entities/breadcrumbs';
import type { Category } from '~/shared/api/commercetools';

type Props = {
  categories: Category[];
  slugList: string[];
  endpoint?: string;
};

export function createCategoriesBreadcrumbsProps({
  categories,
  slugList,
  endpoint = '',
}: Props): BreadcrumbsLinkProps[] {
  const currentCategory = categories.find((category) => category.slug === slugList[0]);

  if (!currentCategory || !currentCategory.slug || !currentCategory.name) {
    return [];
  }

  const { id, name: label, slug } = currentCategory;
  const href = `${endpoint}/${slug}`;

  return [
    { id, label, href },
    ...createCategoriesBreadcrumbsProps({
      categories: currentCategory.children,
      slugList: slugList.slice(1),
      endpoint: href,
    }),
  ];
}
