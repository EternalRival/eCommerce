import { $http, CTP_PROJECT_KEY, customerSignInResultSchema, myCustomerDraftSchema } from '../model';
import { createAuthorizationHeader } from './create-authorization-header';

import type { CustomerSignInResult, MyCustomerDraft } from '../model';

export async function signUpCustomer(token: string, signUpDto: MyCustomerDraft): Promise<CustomerSignInResult> {
  return $http.api
    .post(`/${CTP_PROJECT_KEY}/me/signup`, myCustomerDraftSchema.parse(signUpDto), {
      headers: createAuthorizationHeader(token),
    })
    .then(({ data }) => customerSignInResultSchema.parse(data));
}
