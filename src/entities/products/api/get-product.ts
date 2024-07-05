import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import { variantSchema } from '../model';

const operationName = QueryKey.PRODUCT;

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

export type GetProductReturn = z.infer<typeof productSchema>;

type Variables = {
  key?: string;
};

export async function getProduct({
  token,
  variables,
}: {
  token: Maybe<string>;
  variables?: Variables;
}): Promise<GetProductReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => productSchema.parse(data));
}
