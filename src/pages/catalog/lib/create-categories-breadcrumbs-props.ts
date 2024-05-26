import type { BreadcrumbsLinkProps } from '~/entities/breadcrumbs';
import type { QueryCategoriesReturn } from '~/shared/api/commercetools';

type Category = QueryCategoriesReturn['results'][number];

type Props = {
  baseEndpoint: string;
  categories: Category[];
  slugList: string[];
};

export function createCategoriesBreadcrumbsProps({
  baseEndpoint,
  categories,
  slugList,
}: Props): BreadcrumbsLinkProps[] {
  if (categories.length < 1) {
    return [];
  }

  const result: BreadcrumbsLinkProps[] = [];
  const slugLength = slugList.length;
  let lastSlug: Nullable<string> = null;
  let lastHref = baseEndpoint;

  for (let i = 0; i < slugLength; i += 1) {
    const currentCategory = categories.find((category) => category.slug === slugList[i]);

    if (
      !currentCategory?.slug ||
      !currentCategory.name ||
      (currentCategory.parent && currentCategory.parent.slug !== lastSlug)
    ) {
      break;
    }

    const { id, name, slug } = currentCategory;
    const href = `${lastHref}/${slug}`;

    result.push({ id, href, label: name });

    lastSlug = slug;
    lastHref = href;
  }

  return result;
}
