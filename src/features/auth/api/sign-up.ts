import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { CountryCode } from '~/shared/api/commercetools';

const operationName = QueryKey.SIGN_UP;

const query = `
mutation ${operationName}($draft: CustomerSignMeUpDraft!) {
  customerSignMeUp(draft: $draft) {
    customer {
      id
      email
    }
  }
}
`;

const signUpSchema = z.object({
  customerSignMeUp: z.object({
    customer: z.object({
      id: z.string(),
      email: z.string(),
    }),
  }),
});

type SignUpReturn = z.infer<typeof signUpSchema>;

type Draft = {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: {
    country: CountryCode;
    postalCode?: string;
    city?: string;
    streetName?: string;
  }[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  shippingAddresses?: number[];
  billingAddresses?: number[];
};

type SignUpDto = {
  token: Maybe<string>;
  variables: {
    draft: Draft;
  };
};

export async function signUp({ token, variables }: SignUpDto): Promise<SignUpReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => signUpSchema.parse(data));
}
