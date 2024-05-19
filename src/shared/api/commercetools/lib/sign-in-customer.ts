import { CTP_PROJECT_KEY, customerSignInResultSchema, httpClient, myCustomerSignInSchema } from '../model';
import { createAuthorizationHeader } from './create-authorization-header';
import { createContentTypeHeader } from './create-content-type-header';

import type { CustomerSignInResult, MyCustomerSignIn } from '../model';

// https://docs.commercetools.com/api/projects/me-profile#authenticate-sign-in-customer
export async function signInCustomer(token: string, signInDto: MyCustomerSignIn): Promise<CustomerSignInResult> {
  return httpClient.api
    .post(`/${CTP_PROJECT_KEY}/me/login`, myCustomerSignInSchema.parse(signInDto), {
      headers: {
        ...createContentTypeHeader('json'),
        ...createAuthorizationHeader(token),
      },
    })
    .then(({ data }) => customerSignInResultSchema.parse(data));
}
