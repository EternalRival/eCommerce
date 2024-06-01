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
  })
  .transform((data) => ({
    attributes: data.productType?.attributeDefinitions.results.map((attribute) => ({
      key: attribute.name,
      label: attribute.label,
      values: attribute.type.values.results,
    })),
  }));

export type QueryPizzaAttributesReturn = z.infer<typeof pizzaAttributesSchema>;

async function queryPizzaAttributes({ token }: { token: Maybe<string> }): Promise<QueryPizzaAttributesReturn> {
  return $http.gql({ token, operationName, query }).then((data) => pizzaAttributesSchema.parse(data));
}

export function usePizzaAttributesQuery({
  token,
}: {
  token: Maybe<string>;
}): UseQueryResult<QueryPizzaAttributesReturn> {
  return useQuery({
    queryKey: [operationName, { token }],
    queryFn() {
      return queryPizzaAttributes({ token });
    },
  });
}
