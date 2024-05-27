import { createCategoriesBreadcrumbsProps } from './create-categories-breadcrumbs-props';

import type { BreadcrumbsLinkProps } from '~/entities/breadcrumbs';

describe('createCategoriesBreadcrumbsProps', () => {
  const categoryA = { id: 'A', name: 'A', slug: 'a', parent: null };
  const categoryB = { id: 'B', name: 'B', slug: 'b', parent: { slug: 'a' } };
  const categoryC = { id: 'C', name: 'C', slug: 'c', parent: { slug: 'b' } };

  const expectedA = { id: 'A', label: 'A', href: '/a' };
  const expectedB = { id: 'B', label: 'B', href: '/a/b' };
  const expectedC = { id: 'C', label: 'C', href: '/a/b/c' };

  const createProps = (slugList: string[]): BreadcrumbsLinkProps[] =>
    createCategoriesBreadcrumbsProps({
      categories: [categoryA, categoryB, categoryC],
      slugList,
    });

  it('return empty list on empty categories list', () => {
    [[], ['a'], ['a', 'b'], ['a', 'b', 'c']].forEach((slugList) => {
      expect(createCategoriesBreadcrumbsProps({ categories: [], slugList })).toEqual([]);
    });
  });

  it('return empty list on invalid root slug', () => {
    expect(createProps(['b', 'c'])).toEqual([]);
    expect(createProps(['invalid', 'b', 'c'])).toEqual([]);
  });

  it('return one breadcrumb props object on invalid second slug', () => {
    expect(createProps(['a', 'invalid', 'c'])).toEqual([expectedA]);
    expect(createProps(['a', 'c', 'b'])).toEqual([expectedA]);
  });

  it('return full breadcrumb props objects list on valid data', () => {
    expect(createProps([])).toEqual([]);
    expect(createProps(['a'])).toEqual([expectedA]);
    expect(createProps(['a', 'b'])).toEqual([expectedA, expectedB]);
    expect(createProps(['a', 'b', 'c'])).toEqual([expectedA, expectedB, expectedC]);
  });
});
