import { z } from 'zod';

import { $http, currencyCodeSchema } from '../model';

// https://impex.europe-west1.gcp.commercetools.com/graphiql?query=%0A%20%20query%20IntrospectionQuery%20%7B%0A%20%20%20%20__schema%20%7B%0A%20%20%20%20%20%20queryType%20%7B%20name%20%7D%0A%20%20%20%20%20%20mutationType%20%7B%20name%20%7D%0A%20%20%20%20%20%20subscriptionType%20%7B%20name%20%7D%0A%20%20%20%20%20%20types%20%7B%0A%20%20%20%20%20%20%20%20...FullType%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20directives%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20locations%0A%20%20%20%20%20%20%20%20args%20%7B%0A%20%20%20%20%20%20%20%20%20%20...InputValue%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%0A%20%20fragment%20FullType%20on%20__Type%20%7B%0A%20%20%20%20kind%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20fields(includeDeprecated%3A%20true)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20args%20%7B%0A%20%20%20%20%20%20%20%20...InputValue%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20isDeprecated%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%20%20inputFields%20%7B%0A%20%20%20%20%20%20...InputValue%0A%20%20%20%20%7D%0A%20%20%20%20interfaces%20%7B%0A%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%7D%0A%20%20%20%20enumValues(includeDeprecated%3A%20true)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20isDeprecated%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%20%20possibleTypes%20%7B%0A%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%7D%0A%20%20%7D%0A%0A%20%20fragment%20InputValue%20on%20__InputValue%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20type%20%7B%20...TypeRef%20%7D%0A%20%20%20%20defaultValue%0A%20%20%7D%0A%0A%20%20fragment%20TypeRef%20on%20__Type%20%7B%0A%20%20%20%20kind%0A%20%20%20%20name%0A%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20kind%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A&variables=undefined&operationName=undefined

const document = `
query ProductProjectionSearch($limit: Int, $offset: Int, $locale: Locale = "en-US", $country: Country = "US", $currency: Currency = "USD") {
  productProjectionSearch(limit: $limit, offset: $offset) {
    count
    offset
    total
    results {
      id
      slug(locale: $locale)
      name(locale: $locale)
      description(locale: $locale)
      masterVariant {
        images {
          url
          dimensions {
            width
            height
          }
        }
        price(currency: $currency, country: $country) {
          value {
            ...baseMoney
          }
          discounted {
            value {
              ...baseMoney
            }
          }
        }
      }
    }
  }
}

fragment baseMoney on BaseMoney {
  currencyCode
  centAmount
  fractionDigits
}
`;

const baseMoneySchema = z.object({
  currencyCode: currencyCodeSchema,
  centAmount: z.number(),
  fractionDigits: z.number(),
});

const productProjectionSearchSchema = z
  .object({
    productProjectionSearch: z.object({
      count: z.number(),
      offset: z.number(),
      total: z.number(),
      results: z.array(
        z.object({
          id: z.string(),
          slug: z.string().nullish(),
          name: z.string().nullish(),
          description: z.string().nullish(),
          masterVariant: z.object({
            images: z.array(
              z.object({
                url: z.string(),
                dimensions: z.object({
                  width: z.number(),
                  height: z.number(),
                }),
              })
            ),
            price: z
              .object({
                value: baseMoneySchema,
                discounted: z.object({ value: baseMoneySchema }).nullable(),
              })
              .nullable(),
          }),
        })
      ),
    }),
  })
  .transform((data) => data.productProjectionSearch);

export type QueryProductProjectionSearchReturn = z.infer<typeof productProjectionSearchSchema>;

export async function queryProductProjectionSearch(token: string): Promise<QueryProductProjectionSearchReturn> {
  return $http
    .gql({
      token,
      operationName: 'ProductProjectionSearch',
      query: document,
      variables: { limit: 120 },
    })
    .then((response) => productProjectionSearchSchema.parse(response));
}
