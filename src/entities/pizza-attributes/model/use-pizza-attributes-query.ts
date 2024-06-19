import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { UseQueryResult } from '@tanstack/react-query';

const operationName = QueryKey.PIZZA_ATTRIBUTES;

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
              total
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

const pizzaAttributesSchema = z.object({
  productType: z
    .object({
      attributeDefinitions: z.object({
        results: z.array(
          z.object({
            name: z.string(),
            label: z.string().nullish(),
            type: z.object({
              values: z.object({
                total: z.number(),
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
});

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
