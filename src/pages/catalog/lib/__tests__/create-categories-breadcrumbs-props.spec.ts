import { createCategoriesBreadcrumbsProps } from '../create-categories-breadcrumbs-props';

describe('createCategoriesBreadcrumbsProps', () => {
  const propsA = { id: 'A', name: 'A', slug: 'a', parent: null };
  const propsB = { id: 'B', name: 'B', slug: 'b', parent: { slug: 'a' } };
  const propsC = { id: 'C', name: 'C', slug: 'c', parent: { slug: 'b' } };

  const expectedA = { id: 'A', label: 'A', href: '/a' };
  const expectedB = { id: 'B', label: 'B', href: '/a/b' };
  const expectedC = { id: 'C', label: 'C', href: '/a/b/c' };

  it('return empty list on no category', () => {
    expect(createCategoriesBreadcrumbsProps({ category: undefined })).toEqual([]);
  });

  it('return full breadcrumb props objects list on valid data', () => {
    const categoryA = { ...propsA, children: [] };
    const categoryAB = { ...propsA, children: [{ ...propsB, children: [] }] };
    const categoryABC = { ...propsA, children: [{ ...propsB, children: [{ ...propsC, children: [] }] }] };

    expect(createCategoriesBreadcrumbsProps({ category: categoryA })).toEqual([expectedA]);
    expect(createCategoriesBreadcrumbsProps({ category: categoryAB })).toEqual([expectedA, expectedB]);
    expect(createCategoriesBreadcrumbsProps({ category: categoryABC })).toEqual([expectedA, expectedB, expectedC]);
  });
});
