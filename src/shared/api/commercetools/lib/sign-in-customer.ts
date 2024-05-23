import { $http, CTP_PROJECT_KEY, customerSignInResultSchema, myCustomerSignInSchema } from '../model';

import type { CustomerSignInResult, MyCustomerSignIn } from '../model';

// https://docs.commercetools.com/api/projects/me-profile#authenticate-sign-in-customer
export async function signInCustomer(token: string, signInDto: MyCustomerSignIn): Promise<CustomerSignInResult> {
  return $http.api
    .post(`/${CTP_PROJECT_KEY}/me/login`, myCustomerSignInSchema.parse(signInDto), {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => customerSignInResultSchema.parse(data));
}
