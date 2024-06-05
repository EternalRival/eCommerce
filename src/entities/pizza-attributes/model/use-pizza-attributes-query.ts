import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';

import type { UseQueryResult } from '@tanstack/react-query';

const operationName = 'PizzaAttributes';

const query = `
query ${operationName}($locale: Locale = "en", $productTypeKey: String = "pizza") {
  productType(key: $productTypeKey) {
    attributeDefinitions {
      results {
        name
        label(locale: $locale)
        type {
          ... on EnumAttributeDefinitionType {
            values {
              results {
                key
                label
              }
            }
          }
        }
      }
    }
  }
  productProjectionSearch(facets: [{string: "variants.price.centAmount:range (0 to *) as prices"}]) {
    facets {
      facet
      value {
        ... on RangeFacetResult {
          ranges {
            ... on RangeCountDouble {
              min
              max
            }
          }
        }
      }
    }
  }
}
`;

const pizzaAttributesSchema = z
  .object({
    productType: z
      .object({
        attributeDefinitions: z.object({
          results: z.array(
            z.object({
              name: z.string(),
              label: z.string().nullish(),
              type: z.object({
                values: z.object({
                  results: z.array(
                    z.object({
                      key: z.string(),
                      label: z.string(),
                    })
                  ),
                }),
              }),
            })
          ),
        }),
      })
      .nullish(),
    productProjectionSearch: z.object({
      facets: z.array(
        z.object({
          facet: z.string(),
          value: z.object({
            ranges: z.array(
              z.object({
                min: z.number(),
                max: z.number(),
              })
            ),
          }),
        })
      ),
    }),
  })
  .transform((data) => ({
    attributes:
      data.productType?.attributeDefinitions.results.map((attribute) => ({
        key: attribute.name,
        label: attribute.label ?? null,
        values: attribute.type.values.results,
      })) ?? null,
    prices:
      data.productProjectionSearch.facets.find(({ facet }) => facet === 'prices')?.value.ranges.find(Boolean) ?? null,
  }));

export type QueryPizzaAttributesReturn = z.infer<typeof pizzaAttributesSchema>;

async function queryPizzaAttributes({ token }: { token: Maybe<string> }): Promise<QueryPizzaAttributesReturn> {
  return $http.gql({ token, operationName, query }).then((data) => pizzaAttributesSchema.parse(data));
}

export function usePizzaAttributesQuery({
  token,
  enabled,
}: {
  token: Maybe<string>;
  enabled?: boolean;
}): UseQueryResult<QueryPizzaAttributesReturn> {
  return useQuery({
    queryKey: [operationName, { token }],
    queryFn() {
      return queryPizzaAttributes({ token });
    },
    enabled,
  });
}
