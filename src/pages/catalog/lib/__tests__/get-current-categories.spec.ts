import { getCurrentCategories } from '../get-current-categories';

describe('getCurrentCategories', () => {
  const categoryA = { id: 'A', name: 'A', slug: 'a', parent: null };
  const categoryB = { id: 'B', name: 'B', slug: 'b', parent: { slug: 'a' } };
  const categoryC = { id: 'C', name: 'C', slug: 'c', parent: { slug: 'b' } };

  const getCurrentCategoriesBySlugList = (slugList: string[]): ReturnType<typeof getCurrentCategories> =>
    getCurrentCategories({
      categories: [categoryA, categoryB, categoryC],
      slugList,
    });

  it('return empty list on empty categories list', () => {
    [[], ['a'], ['a', 'b'], ['a', 'b', 'c']].forEach((slugList) => {
      expect(getCurrentCategories({ categories: [], slugList })).toEqual([]);
    });
  });

  it('return empty list on invalid first slug', () => {
    expect(getCurrentCategoriesBySlugList(['b', 'c'])).toEqual([]);
    expect(getCurrentCategoriesBySlugList(['invalid', 'b', 'c'])).toEqual([]);
  });

  it('return list with one category on invalid second slug', () => {
    expect(getCurrentCategoriesBySlugList(['a', 'invalid', 'c'])).toEqual([categoryA]);
    expect(getCurrentCategoriesBySlugList(['a', 'c', 'b'])).toEqual([categoryA]);
  });

  it('return full current category list on valid data', () => {
    expect(getCurrentCategoriesBySlugList([])).toEqual([]);
    expect(getCurrentCategoriesBySlugList(['a'])).toEqual([categoryA]);
    expect(getCurrentCategoriesBySlugList(['a', 'b'])).toEqual([categoryA, categoryB]);
    expect(getCurrentCategoriesBySlugList(['a', 'b', 'c'])).toEqual([categoryA, categoryB, categoryC]);
  });
});
