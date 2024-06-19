import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
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

const customerSignUpSchema = z.object({
  customerSignMeUp: z.object({
    customer: z.object({
      id: z.string(),
      email: z.string(),
    }),
  }),
});

type MutateCustomerSignUpReturn = z.infer<typeof customerSignUpSchema>;

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

async function mutateCustomerSignUp({ token, variables }: SignUpDto): Promise<MutateCustomerSignUpReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => customerSignUpSchema.parse(data));
}

type UseCustomerSignUpMutationOptions = UseMutationOptions<MutateCustomerSignUpReturn, Error, SignUpDto>;

type UseCustomerSignUpMutationResult = UseMutationResult<MutateCustomerSignUpReturn, Error, SignUpDto>;

export function useCustomerSignUpMutation(
  options: Omit<UseCustomerSignUpMutationOptions, 'mutationFn'> = {}
): UseCustomerSignUpMutationResult {
  return useMutation({ mutationFn: mutateCustomerSignUp, ...options });
}
