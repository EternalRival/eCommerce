import { CTP_PROJECT_KEY, apiClient, customerSignInResultSchema } from '../model';
import { createContentTypeHeader } from './create-content-type-header';

import type { CustomerSignInResult, SignInDto, TokenInfo } from '../model';

// https://docs.commercetools.com/api/projects/me-profile#authenticate-sign-in-customer
export async function myCustomerSignIn(
  token: TokenInfo['access_token'],
  { email, password }: SignInDto
): Promise<CustomerSignInResult> {
  const endpoint = `/${CTP_PROJECT_KEY}/me/login`;

  const payload = {
    email,
    password,
  };
  const config = {
    headers: {
      ...createContentTypeHeader('json'),
      Authorization: `Bearer ${token}`,
    },
  };

  return apiClient.post(endpoint, payload, config).then(({ data }) => customerSignInResultSchema.parse(data));
}
