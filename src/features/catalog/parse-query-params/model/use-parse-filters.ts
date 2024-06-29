import { useQuery } from '@tanstack/react-query';

import {
  ParamKey,
  createCategoryFilter,
  createEnumAttributeFilter,
  createPriceFilter,
  getCategories,
  getCurrentCategory,
  getPizzaAttributes,
} from '~/entities/products';
import { useUserStore } from '~/entities/user';
import { useParseQueryParam } from '~/shared/lib/nextjs';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { useSearchParams } from '~/shared/lib/use-search-params';

import type { SearchFilterInput } from '~/entities/products';

export function useParseFilters(): { isPending: boolean; filters: SearchFilterInput[] } {
  const token = useUserStore((store) => store.token.access_token);
  const { isReady, param: slugList } = useParseQueryParam('slug');

  const categoriesQuery = useQuery({
    queryKey: [QueryKey.CATEGORIES, token],
    queryFn() {
      return getCategories({ token });
    },
  });
  const currentCategory = getCurrentCategory({ slugList, categories: categoriesQuery.data?.categories.results });

  const attributesQuery = useQuery({
    queryKey: [QueryKey.PIZZA_ATTRIBUTES, token],
    queryFn() {
      return getPizzaAttributes({ token });
    },
  });

  const { searchParams } = useSearchParams();

  const filters = [];

  if (currentCategory?.id) {
    filters.push(createCategoryFilter({ id: currentCategory.id }));
  }

  attributesQuery.data?.productType?.attributeDefinitions.results.forEach((attribute) => {
    filters.push(
      createEnumAttributeFilter({
        key: attribute.name,
        values: searchParams
          .getAll(attribute.name)
          .filter((value) => attribute.type.values.results.find(({ key }) => key === value)),
      })
    );
  });

  const [priceFrom, priceTo] = [searchParams.get(ParamKey.PRICE_MIN), searchParams.get(ParamKey.PRICE_MAX)];

  filters.push(
    createPriceFilter({
      from: priceFrom ? (Number(priceFrom) * 100).toString() : null,
      to: priceTo ? (Number(priceTo) * 100).toString() : null,
    })
  );

  return {
    isPending: !isReady || categoriesQuery.isPending,
    filters,
  };
}
