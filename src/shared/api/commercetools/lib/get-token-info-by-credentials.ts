import { z } from 'zod';

import { CTP_BASIC_AUTH, CTP_PROJECT_KEY, httpClient } from '../model';
import { createContentTypeHeader } from './create-content-type-header';
import { createScope } from './create-scope';

import type { SignInDto } from '../model';

const customerTokenInfoSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  refresh_token: z.string(),
});

type CustomerTokenInfo = z.infer<typeof customerTokenInfoSchema>;

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
