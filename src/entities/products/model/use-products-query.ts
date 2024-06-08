import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { $http, currencyCodeSchema } from '~/shared/api/commercetools';

import type { UseQueryResult } from '@tanstack/react-query';

const operationName = 'Products';

const query = `
query ${operationName}($limit: Int, $offset: Int, $sorts: [String!], $filters: [SearchFilterInput!], $locale: Locale = "en", $currency: Currency = "USD") {
  productProjectionSearch(limit: $limit, offset: $offset, sorts: $sorts, filters: $filters) {
    results {
      id
      name(locale: $locale)
      slug(locale: $locale)
      description(locale: $locale)
      masterVariant {
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
          dimensions {
            width
            height
          }
        }
      }
    }
  }
}

fragment baseMoney on BaseMoney {
  currencyCode
  centAmount
  fractionDigits
}
`;

const baseMoneySchema = z.object({
  currencyCode: currencyCodeSchema,
  centAmount: z.number(),
  fractionDigits: z.number(),
});

const productsSchema = z
  .object({
    productProjectionSearch: z.object({
      results: z.array(
        z.object({
          id: z.string(),
          slug: z.string().nullish(),
          name: z.string().nullish(),
          description: z.string().nullish(),
          masterVariant: z.object({
            price: z
              .object({
                value: baseMoneySchema,
                discounted: z
                  .object({
                    value: baseMoneySchema,
                  })
                  .nullish(),
              })
              .nullish(),
            images: z.array(
              z.object({
                url: z.string(),
                dimensions: z.object({
                  width: z.number(),
                  height: z.number(),
                }),
              })
            ),
          }),
        })
      ),
    }),
  })
  .transform((data) => ({
    products: data.productProjectionSearch.results.map((product) => ({
      id: product.id,
      slug: product.slug,
      images: product.masterVariant.images,
      name: product.name,
      description: product.description,
      price: product.masterVariant.price?.value,
      discountedPrice: product.masterVariant.price?.discounted?.value,
    })),
  }));

export type QueryProductsReturn = z.infer<typeof productsSchema>;

export type SearchFilterInput = { string: string };

type Variables = {
  limit?: number;
  offset?: number;
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

const sortsSchema = z.enum(['price asc', 'price desc', 'name.en asc', 'name.en desc']);

export function createSorts(sorts: string[]): string[] {
  return [sortsSchema.catch('price asc').parse(sorts[0])];
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
