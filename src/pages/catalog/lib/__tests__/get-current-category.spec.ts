import { getCurrentCategory } from '../get-current-category';

describe('getCurrentCategory', () => {
  const propsA = { id: 'A', name: 'A', slug: 'a', parent: null };
  const propsB = { id: 'B', name: 'B', slug: 'b', parent: { slug: 'a' } };
  const propsC = { id: 'C', name: 'C', slug: 'c', parent: { slug: 'b' } };

  const categories = [{ ...propsA, children: [{ ...propsB, children: [{ ...propsC, children: [] }] }] }];

  it('return null on empty categories list', () => {
    [[], ['a'], ['a', 'b'], ['a', 'b', 'c']].forEach((slugList) => {
      expect(getCurrentCategory({ categories: [], slugList })).toBeNull();
    });
  });

  it('return null on invalid first slug', () => {
    expect(getCurrentCategory({ categories, slugList: ['b', 'c'] })).toBeNull();
    expect(getCurrentCategory({ categories, slugList: ['invalid', 'b', 'c'] })).toBeNull();
  });

  it('return 1-depth category on invalid second slug', () => {
    expect(getCurrentCategory({ categories, slugList: ['a', 'invalid', 'c'] })).toEqual({ ...propsA, children: [] });
    expect(getCurrentCategory({ categories, slugList: ['a', 'a', 'a'] })).toEqual({ ...propsA, children: [] });
    expect(getCurrentCategory({ categories, slugList: ['a', 'c', 'b'] })).toEqual({ ...propsA, children: [] });
  });

  it('return n-depth category on n valid slugs', () => {
    expect(getCurrentCategory({ categories, slugList: [] })).toBeNull();

    const expectedA = { ...propsA, children: [] };
    expect(getCurrentCategory({ categories, slugList: ['a'] })).toEqual(expectedA);

    const expectedAB = { ...propsA, children: [{ ...propsB, children: [] }] };
    expect(getCurrentCategory({ categories, slugList: ['a', 'b'] })).toEqual(expectedAB);

    const expectedABC = { ...propsA, children: [{ ...propsB, children: [{ ...propsC, children: [] }] }] };
    expect(getCurrentCategory({ categories, slugList: ['a', 'b', 'c'] })).toEqual(expectedABC);
  });
});
