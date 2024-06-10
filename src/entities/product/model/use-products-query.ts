import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';

import { getProductPriceRanges } from './get-product-price-range';
import { variantSchema } from './variant.schema';

import type { UseQueryResult } from '@tanstack/react-query';

const operationName = 'Products';

const query = `
query ${operationName}($limit: Int, $offset: Int, $search: String, $sorts: [String!], $filters: [SearchFilterInput!], $locale: Locale = "en", $currency: Currency = "USD") {
  productProjectionSearch(limit: $limit, offset: $offset, locale: $locale, text: $search, fuzzy: true, sorts: $sorts, filters: $filters) {
    results {
      id
      key
      name(locale: $locale)
      description(locale: $locale)
      masterVariant {
        ...variant
      }
      variants {
        ...variant
      }
    }
  }
}

fragment variant on ProductSearchVariant {
  price(currency: $currency) {
    value {
      ...baseMoney
    }
    discounted {
      value {
        ...baseMoney
      }
    }
  }
  images {
    url
  }
}

fragment baseMoney on BaseMoney {
  currencyCode
  centAmount
  fractionDigits
}
`;

const productsSchema = z
  .object({
    productProjectionSearch: z.object({
      results: z.array(
        z.object({
          id: z.string(),
          key: z.string().nullish(),
          name: z.string().nullish(),
          description: z.string().nullish(),
          masterVariant: variantSchema,
          variants: z.array(variantSchema),
        })
      ),
    }),
  })
  .transform((data) => ({
    products: data.productProjectionSearch.results.map((product) => ({
      id: product.id,
      key: product.key,
      masterImage: product.masterVariant.images.find(({ url }) => Boolean(url)),
      name: product.name,
      description: product.description,
      ...getProductPriceRanges({
        currencyCode: product.masterVariant.price?.value.currencyCode,
        variants: [product.masterVariant, ...product.variants],
      }),
    })),
  }));

export type QueryProductsReturn = z.infer<typeof productsSchema>;

export type SearchFilterInput = { string: string };

type Variables = {
  limit?: number;
  offset?: number;
  search?: string;
  sorts?: string[];
  filters?: SearchFilterInput[];
};

async function queryProducts({
  token,
  variables,
}: {
  token: Maybe<string>;
  variables?: Variables;
}): Promise<QueryProductsReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => productsSchema.parse(data));
}

export function createCategoryFilter({ id }: { id: string }): SearchFilterInput {
  return { string: `categories.id:subtree("${id}")` };
}

export function createEnumAttributeFilter({ key, values }: { key: string; values: string[] }): SearchFilterInput {
  const formattedValues = values.map((value) => `"${value}"`);

  return { string: `variants.attributes.${key}.key:${formattedValues.toString()}` };
}

export function createPriceFilter({ from, to }: { from: Maybe<string>; to: Maybe<string> }): SearchFilterInput {
  return { string: `variants.price.centAmount:range(${from ?? '0'} to ${to ?? '*'})` };
}

export const enum SortOption {
  PRICE_ASC = 'price asc',
  PRICE_DESC = 'price desc',
  NAME_ASC = 'name.en asc',
  NAME_DESC = 'name.en desc',
}

export const defaultSortOption = SortOption.PRICE_ASC;

const sortsSchema = z.enum([SortOption.PRICE_ASC, SortOption.PRICE_DESC, SortOption.NAME_ASC, SortOption.NAME_DESC]);

export function createSorts(sorts: string[]): string[] {
  return [sortsSchema.catch(defaultSortOption).parse(sorts[0])];
}

export function createSearch(search: Maybe<string>): string {
  return search ?? '';
}

export function useProductsQuery({
  token,
  variables,
  enabled,
}: {
  token: Maybe<string>;
  variables?: Variables;
  enabled?: boolean;
}): UseQueryResult<QueryProductsReturn> {
  return useQuery({
    queryKey: [operationName, token, variables],
    queryFn() {
      return queryProducts({ token, variables });
    },
    enabled,
  });
}
