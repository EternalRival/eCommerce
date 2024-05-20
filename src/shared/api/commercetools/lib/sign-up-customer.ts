import { CTP_PROJECT_KEY, customerSignInResultSchema, httpClient, myCustomerDraftSchema } from '../model';
import { createAuthorizationHeader } from './create-authorization-header';
import { createContentTypeHeader } from './create-content-type-header';

import type { CustomerSignInResult, MyCustomerDraft } from '../model';

export async function signUpCustomer(token: string, signUpDto: MyCustomerDraft): Promise<CustomerSignInResult> {
  return httpClient.api
    .post(`/${CTP_PROJECT_KEY}/me/signup`, myCustomerDraftSchema.parse(signUpDto), {
      headers: {
        ...createContentTypeHeader('json'),
        ...createAuthorizationHeader(token),
      },
    })
    .then(({ data }) => customerSignInResultSchema.parse(data));
}
