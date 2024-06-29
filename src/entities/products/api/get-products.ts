import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import { variantSchema } from '../model';

import type { SearchFilterInput } from '../model';

const operationName = QueryKey.PRODUCTS;

const query = `
query ${operationName}($limit: Int, $offset: Int, $search: String, $sorts: [String!], $filters: [SearchFilterInput!], $locale: Locale = "en", $currency: Currency = "USD") {
  productProjectionSearch(limit: $limit, offset: $offset, locale: $locale, text: $search, fuzzy: true, sorts: $sorts, filters: $filters) {
    count
    total
    results {
      id
      key
      name(locale: $locale)
      description(locale: $locale)
      masterVariant {
        ...variant
      }
      variants {
        ...variant
      }
    }
  }
}

fragment variant on ProductSearchVariant {
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
    label
    dimensions {
      width
      height
    }
  }
}

fragment baseMoney on BaseMoney {
  currencyCode
  centAmount
  fractionDigits
}
`;

const productsSchema = z.object({
  productProjectionSearch: z.object({
    count: z.number(),
    total: z.number(),
    results: z.array(
      z.object({
        id: z.string(),
        key: z.string().nullish(),
        name: z.string().nullish(),
        description: z.string().nullish(),
        masterVariant: variantSchema,
        variants: z.array(variantSchema),
      })
    ),
  }),
});

export type GetProductsReturn = z.infer<typeof productsSchema>;

type Variables = {
  limit?: number;
  offset?: number;
  search?: string;
  sorts?: string[];
  filters?: SearchFilterInput[];
};

export async function getProducts({
  token,
  variables,
}: {
  token: Maybe<string>;
  variables?: Variables;
}): Promise<GetProductsReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => productsSchema.parse(data));
}
