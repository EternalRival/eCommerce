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
          isSearchable
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
          name: z.string(),
          label: z.string().nullish(),
          isSearchable: z.boolean(),
        })
      ),
    }),
  })
  .transform((data) => data.productTypes);

export type QueryProductTypesReturn = z.infer<typeof productTypesSchema>;

export async function queryProductTypes(token: Nullable<string>): Promise<QueryProductTypesReturn> {
  if (!token) {
    throw new Error('No token provided');
  }

  return $http
    .gql({
      token,
      operationName: 'ProductTypes',
      query: document,
    })
    .then((response) => productTypesSchema.parse(response));
}
