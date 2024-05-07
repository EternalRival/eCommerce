import { CTP_AUTH_URL, CTP_BASIC_AUTH, CTP_PROJECT_KEY, apiClient, tokenInfoSchema } from '../model';
import { createContentTypeHeader } from './create-content-type-header';
import { createScope } from './create-scope';

import type { SignInDto, TokenInfo } from '../model';

// https://docs.commercetools.com/api/authorization#password-flow-for-global-customers
// https://docs.commercetools.com/tutorials/mobile-spa#creating-a-token-bound-to-a-customer-with-the-password-flow
export async function getTokenInfoByCredentials({ email: username, password }: SignInDto): Promise<TokenInfo> {
  const endpoint = `/oauth/${CTP_PROJECT_KEY}/customers/token`;

  const url = new URL(endpoint, CTP_AUTH_URL).toString();
  const payload = {
    grant_type: 'password',
    username,
    password,
    scope: createScope(['manage_my_profile']), // * добавить дополнительные scope при необходимости
  };
  const config = {
    headers: createContentTypeHeader('urlencoded'),
    auth: CTP_BASIC_AUTH,
  };

  return apiClient.post(url, payload, config).then(({ data }) => tokenInfoSchema.parse(data));
}
