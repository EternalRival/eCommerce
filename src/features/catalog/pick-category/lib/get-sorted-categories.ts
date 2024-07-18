import type { Category } from '~/entities/products';

export function getSortedCategories(categories: Category[]): Category[] {
  return categories.toSorted((a, b) => Number(a.orderHint) - Number(b.orderHint));
}
