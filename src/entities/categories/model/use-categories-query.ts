import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';

import type { UseQueryResult } from '@tanstack/react-query';

const document = `
query Categories($locale: Locale = "en") {
  categories(limit: 100, where: "parent is not defined") {
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
      results: z.array(categorySchema),
    }),
  })
  .transform((data) => data.categories.results);

async function queryCategories({ token }: { token: Maybe<string> }): Promise<Category[]> {
  return $http
    .gql({ token, operationName: 'Categories', query: document })
    .then((data) => categoriesSchema.parse(data));
}

export function useCategoriesQuery({ token }: { token: Maybe<string> }): UseQueryResult<Category[]> {
  return useQuery({
    queryKey: ['categories', token],
    queryFn() {
      return queryCategories({ token });
    },
  });
}
