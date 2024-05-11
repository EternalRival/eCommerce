import { CTP_PROJECT_KEY, customerSignInResultSchema, httpClient } from '../model';
import { createContentTypeHeader } from './create-content-type-header';

import type { CustomerSignInResult, CustomerTokenInfo, SignInDto } from '../model';

// https://docs.commercetools.com/api/projects/me-profile#authenticate-sign-in-customer
export async function myCustomerSignIn(
  token: CustomerTokenInfo['access_token'],
  { email, password }: SignInDto
): Promise<CustomerSignInResult> {
  return httpClient.api
    .post(
      `/${CTP_PROJECT_KEY}/me/login`,
      {
        email,
        password,
      },
      {
        headers: {
          ...createContentTypeHeader('json'),
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(({ data }) => customerSignInResultSchema.parse(data));
}
