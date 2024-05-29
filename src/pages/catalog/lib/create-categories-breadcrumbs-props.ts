import type { BreadcrumbsLinkProps } from '~/entities/breadcrumbs';
import type { Category } from '~/shared/api/commercetools';

type Props = {
  category?: Nullable<Category>;
  endpoint?: string;
};

export function createCategoriesBreadcrumbsProps({ category, endpoint = '' }: Props): BreadcrumbsLinkProps[] {
  if (!category || !category.slug || !category.name) {
    return [];
  }

  const { id, name: label, slug } = category;
  const href = `${endpoint}/${slug}`;

  return [{ id, label, href }, ...createCategoriesBreadcrumbsProps({ category: category.children[0], endpoint: href })];
}
