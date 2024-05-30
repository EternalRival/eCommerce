import { z } from 'zod';

import { $http } from '../model';

const document = `
query ProductTypes($locale: Locale = "en") {
  productTypes {
    results {
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
}
`;
const productTypesSchema = z
  .object({
    productTypes: z.object({
      results: z.array(
        z.object({
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
      ),
    }),
  })
  .transform((data) =>
    data.productTypes.results[0]?.attributeDefinitions.results.map(({ name, label, type }) => ({
      name,
      label,
      values: type.values.results,
    }))
  );

export type QueryProductTypesReturn = z.infer<typeof productTypesSchema>;

type Props = {
  token: Maybe<string>;
};

export async function queryProductTypes({ token }: Props): Promise<QueryProductTypesReturn> {
  return $http
    .gql({
      token,
      operationName: 'ProductTypes',
      query: document,
    })
    .then((response) => productTypesSchema.parse(response));
}
