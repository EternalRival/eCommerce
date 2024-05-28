import type { BreadcrumbsLinkProps } from '~/entities/breadcrumbs';
import type { QueryCategoriesReturn } from '~/shared/api/commercetools';

type Category = QueryCategoriesReturn['results'][number];

type Props = {
  categories?: Category[];
};

export function createCategoriesBreadcrumbsProps({ categories }: Props): BreadcrumbsLinkProps[] {
  if (!categories || categories.length < 1) {
    return [];
  }

  const result: BreadcrumbsLinkProps[] = [];
  const currentCategoriesLength = categories.length;
  let lastHref = '';

  for (let i = 0; i < currentCategoriesLength; i += 1) {
    const currentCategory = categories[i];

    if (!currentCategory?.slug || !currentCategory.name) {
      break;
    }

    const { id, name: label, slug } = currentCategory;
    const href = `${lastHref}/${slug}`;

    result.push({ id, label, href });

    lastHref = href;
  }

  return result;
}
