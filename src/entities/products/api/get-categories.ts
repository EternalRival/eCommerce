import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import { categorySchema } from '../model';

export const operationName = QueryKey.CATEGORIES;

const query = `
query ${operationName}($locale: Locale = "en") {
  productProjectionSearch(facets: [{string: "categories.id as categories counting products"}]) {
    facets {
      facet
      value {
        ... on TermsFacetResult {
          terms {
            term
            count
            productCount
          }
        }
      }
    }
  }
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

const categoriesSchema = z.object({
  categories: z.object({
    results: z.array(categorySchema),
  }),
  productProjectionSearch: z.object({
    facets: z.array(
      z.object({
        facet: z.string(),
        value: z.object({
          terms: z.array(
            z.object({
              term: z.string(),
              count: z.number(),
              productCount: z.number().nullish(),
            })
          ),
        }),
      })
    ),
  }),
});

export type GetCategoriesReturn = z.infer<typeof categoriesSchema>;

export async function getCategories({ token }: { token: Maybe<string> }): Promise<GetCategoriesReturn> {
  return $http.gql({ token, operationName, query }).then((data) => categoriesSchema.parse(data));
}
