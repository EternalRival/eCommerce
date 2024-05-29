import { z } from 'zod';

import { $http } from '../model';

const document = `
query Categories($limit: Int, $locale: Locale = "en") {
  categories(limit: $limit, where: "parent is not defined") {
    count
    offset
    total
    results {
      ...category
      children {
        ...category
        children {
          ...category
          children {
            ...category
            children {
              ...category
            }
          }
        }
      }
    }
  }
}

fragment category on Category {
  id
  slug(locale: $locale)
  name(locale: $locale)
  parent {
    slug(locale: $locale)
  }
}

`;

const baseCategorySchema = z.object({
  id: z.string(),
  slug: z.string().nullish(),
  name: z.string().nullish(),
  parent: z
    .object({
      slug: z.string().nullish(),
    })
    .nullish(),
});

export type Category = z.infer<typeof baseCategorySchema> & {
  children: Category[];
};

const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  children: z.lazy(() => categorySchema.array()),
});

const categoriesSchema = z
  .object({
    categories: z.object({
      count: z.number(),
      offset: z.number(),
      total: z.number(),
      results: z.array(categorySchema),
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
