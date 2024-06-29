import type { Category } from '~/entities/products';

export function createLinkProps({
  baseUrl,
  categories,
  slugList,
}: {
  baseUrl: string;
  slugList: string[];
  categories?: Category[];
}): { id: string; href: string; name: string }[] {
  const currentCategory = categories?.find((category) => category.slug === slugList[0]);

  if (!currentCategory?.slug || !currentCategory.name) {
    return [];
  }

  const { id, name, slug } = currentCategory;
  const href = `${baseUrl}/${slug}`;

  return [
    { id, name, href },
    ...createLinkProps({ baseUrl: href, categories: currentCategory.children, slugList: slugList.slice(1) }),
  ];
}
