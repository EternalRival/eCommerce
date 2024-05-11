import { CTP_BASIC_AUTH, CTP_PROJECT_KEY, customerTokenInfoSchema, httpClient } from '../model';
import { createContentTypeHeader } from './create-content-type-header';
import { createScope } from './create-scope';

import type { CustomerTokenInfo, SignInDto } from '../model';

// https://docs.commercetools.com/api/authorization#password-flow-for-global-customers
// https://docs.commercetools.com/tutorials/mobile-spa#creating-a-token-bound-to-a-customer-with-the-password-flow
export async function getTokenInfoByCredentials({ email: username, password }: SignInDto): Promise<CustomerTokenInfo> {
  return httpClient.auth
    .post(
      `/oauth/${CTP_PROJECT_KEY}/customers/token`,
      {
        grant_type: 'password',
        username,
        password,
        scope: createScope(['manage_my_profile']), // * добавить дополнительные scope при необходимости
      },
      {
        headers: createContentTypeHeader('urlencoded'),
        auth: CTP_BASIC_AUTH,
      }
    )
    .then(({ data }) => customerTokenInfoSchema.parse(data));
}
