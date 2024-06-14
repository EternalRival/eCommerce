import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

import { $http } from '~/shared/api/commercetools';

import { variantSchema } from './variant.schema';

import type { UseQueryResult } from '@tanstack/react-query';

const operationName = 'Product';

const query = `
query ${operationName}($key: String, $locale: Locale = "en", $currency: Currency = "USD") {
  product(key: $key) {
    masterData {
      current {
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
}

fragment variant on ProductVariant {
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

const productSchema = z.object({
  product: z
    .object({
      masterData: z.object({
        current: z
          .object({
            name: z.string().nullish(),
            description: z.string().nullish(),
            masterVariant: variantSchema,
            variants: z.array(variantSchema),
          })
          .nullish(),
      }),
    })
    .nullish(),
});

export type QueryProductReturn = z.infer<typeof productSchema>;

type Variables = {
  key?: string;
};

export async function queryProduct({
  token,
  variables,
}: {
  token: Maybe<string>;
  variables?: Variables;
}): Promise<QueryProductReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => productSchema.parse(data));
}

export function useProductQuery({
  token,
  variables,
  enabled,
}: {
  token: Maybe<string>;
  variables?: Variables;
  enabled?: boolean;
}): UseQueryResult<QueryProductReturn> {
  return useQuery({
    queryKey: [operationName, token, variables],
    queryFn() {
      return queryProduct({ token, variables });
    },
    enabled,
  });
}
