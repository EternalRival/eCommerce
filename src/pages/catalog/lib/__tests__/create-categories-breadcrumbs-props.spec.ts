import { createCategoriesBreadcrumbsProps } from '../create-categories-breadcrumbs-props';

describe('createCategoriesBreadcrumbsProps', () => {
  const categoryA = { id: 'A', name: 'A', slug: 'a', parent: null };
  const categoryB = { id: 'B', name: 'B', slug: 'b', parent: { slug: 'a' } };
  const categoryC = { id: 'C', name: 'C', slug: 'c', parent: { slug: 'b' } };

  const expectedA = { id: 'A', label: 'A', href: '/a' };
  const expectedB = { id: 'B', label: 'B', href: '/a/b' };
  const expectedC = { id: 'C', label: 'C', href: '/a/b/c' };

  it('return empty list on empty categories list', () => {
    expect(createCategoriesBreadcrumbsProps({ categories: undefined })).toEqual([]);
    expect(createCategoriesBreadcrumbsProps({ categories: [] })).toEqual([]);
  });

  it('return full breadcrumb props objects list on valid data', () => {
    const categoriesA = [categoryA];
    expect(createCategoriesBreadcrumbsProps({ categories: categoriesA })).toEqual([expectedA]);

    const categoriesAB = [categoryA, categoryB];
    expect(createCategoriesBreadcrumbsProps({ categories: categoriesAB })).toEqual([expectedA, expectedB]);

    const categoriesABC = [categoryA, categoryB, categoryC];
    expect(createCategoriesBreadcrumbsProps({ categories: categoriesABC })).toEqual([expectedA, expectedB, expectedC]);
  });
});
