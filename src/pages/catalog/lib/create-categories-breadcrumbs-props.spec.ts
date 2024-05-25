import { createCategoriesBreadcrumbsProps } from './create-categories-breadcrumbs-props';

describe('createCategoriesBreadcrumbsProps', () => {
  const categoryA = { id: 'A', slug: 'a', parent: null };
  const categoryB = { id: 'B', slug: 'b', parent: { slug: 'a' } };
  const categoryC = { id: 'C', slug: 'c', parent: { slug: 'b' } };
  const categories = [categoryA, categoryB, categoryC];

  it('return empty list on invalid root slug', () => {
    expect(createCategoriesBreadcrumbsProps(['b', 'c'], categories)).toEqual([]);
    expect(createCategoriesBreadcrumbsProps(['invalid', 'b', 'c'], categories)).toEqual([]);
  });

  it('return root category list on invalid second slug', () => {
    expect(createCategoriesBreadcrumbsProps(['a', 'invalid', 'c'], categories)).toEqual([categoryA]);
    expect(createCategoriesBreadcrumbsProps(['a', 'c', 'b'], categories)).toEqual([categoryA]);
  });

  it('return full props list on valid data', () => {
    expect(createCategoriesBreadcrumbsProps([], categories)).toEqual([]);
    expect(createCategoriesBreadcrumbsProps(['a'], categories)).toEqual([categoryA]);
    expect(createCategoriesBreadcrumbsProps(['a', 'b'], categories)).toEqual([categoryA, categoryB]);
    expect(createCategoriesBreadcrumbsProps(['a', 'b', 'c'], categories)).toEqual([categoryA, categoryB, categoryC]);
  });
});
