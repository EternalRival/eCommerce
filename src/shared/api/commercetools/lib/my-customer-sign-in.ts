import { CTP_PROJECT_KEY, customerSignInResultSchema, httpClient } from '../model';
import { createAuthorizationHeader } from './create-authorization-header';
import { createContentTypeHeader } from './create-content-type-header';

import type { CustomerSignInResult, SignInDto } from '../model';

// https://docs.commercetools.com/api/projects/me-profile#authenticate-sign-in-customer
export async function myCustomerSignIn(token: string, signInDto: SignInDto): Promise<CustomerSignInResult> {
  return httpClient.api
    .post(`/${CTP_PROJECT_KEY}/me/login`, signInDto, {
      headers: {
        ...createContentTypeHeader('json'),
        ...createAuthorizationHeader(token),
      },
    })
    .then(({ data }) => customerSignInResultSchema.parse(data));
}
