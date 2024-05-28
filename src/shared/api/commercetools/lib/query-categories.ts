import { z } from 'zod';

import { $http } from '../model';

const document = `
query Categories($limit: Int, $locale: Locale = "en") {
  categories(limit: $limit) {
    count
    offset
    total
    results {
      id
      slug(locale: $locale)
      name(locale: $locale)
      parent {
        slug(locale: $locale)
      }
    }
  }
}
`;

const categoriesSchema = z
  .object({
    categories: z.object({
      count: z.number(),
      offset: z.number(),
      total: z.number(),
      results: z.array(
        z.object({
          id: z.string(),
          slug: z.string().nullish(),
          name: z.string().nullish(),
          parent: z
            .object({
              slug: z.string().nullish(),
            })
            .nullish(),
        })
      ),
    }),
  })
  .transform((data) => data.categories);

export type QueryCategoriesReturn = z.infer<typeof categoriesSchema>;

type Props = {
  token: Maybe<string>;
  variables?: { limit?: number };
};

export async function queryCategories({ token, variables }: Props): Promise<QueryCategoriesReturn> {
  return $http
    .gql({
      token,
      operationName: 'Categories',
      query: document,
      variables,
    })
    .then((response) => categoriesSchema.parse(response));
}
