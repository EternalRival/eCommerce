import { createCategoriesBreadcrumbsProps } from '../create-categories-breadcrumbs-props';

import type { BreadcrumbsLinkProps } from '~/entities/breadcrumbs';

describe('createCategoriesBreadcrumbsProps', () => {
  const propsA = { id: 'A', name: 'A', slug: 'a', parent: null };
  const propsB = { id: 'B', name: 'B', slug: 'b', parent: { slug: 'a' } };
  const propsC = { id: 'C', name: 'C', slug: 'c', parent: { slug: 'b' } };

  const categories = [{ ...propsA, children: [{ ...propsB, children: [{ ...propsC, children: [] }] }] }];

  const createProps = (slugList: string[]): BreadcrumbsLinkProps[] =>
    createCategoriesBreadcrumbsProps({ categories, slugList });

  const expectedA = { id: 'A', label: 'A', href: '/a' };
  const expectedB = { id: 'B', label: 'B', href: '/a/b' };
  const expectedC = { id: 'C', label: 'C', href: '/a/b/c' };

  it('return empty list on empty categories list', () => {
    expect(createCategoriesBreadcrumbsProps({ categories: [], slugList: ['a', 'b', 'c'] })).toEqual([]);
  });

  it('return empty list on invalid first slug', () => {
    expect(createProps(['b', 'c'])).toEqual([]);
    expect(createProps(['invalid', 'b', 'c'])).toEqual([]);
  });

  it('return list with 1 props object on invalid second slug', () => {
    expect(createProps(['a', 'invalid', 'c'])).toEqual([expectedA]);
    expect(createProps(['a', 'a', 'a'])).toEqual([expectedA]);
    expect(createProps(['a', 'c', 'b'])).toEqual([expectedA]);
  });

  it('return full breadcrumb props objects list on valid data', () => {
    expect(createProps([])).toEqual([]);
    expect(createProps(['a'])).toEqual([expectedA]);
    expect(createProps(['a', 'b'])).toEqual([expectedA, expectedB]);
    expect(createProps(['a', 'b', 'c'])).toEqual([expectedA, expectedB, expectedC]);
  });
});
