import { z } from 'zod';

import {
  CTP_BASIC_AUTH,
  CTP_PROJECT_KEY,
  customerTokenScopes,
  httpClient,
  tokenInfoByCredentialsResultSchema,
} from '../model';
import { createContentTypeHeader } from './create-content-type-header';
import { createScope } from './create-scope';

import type { TokenInfoByCredentialsResult } from '../model';

// https://docs.commercetools.com/api/authorization#password-flow-for-global-customers
// https://docs.commercetools.com/tutorials/mobile-spa#creating-a-token-bound-to-a-customer-with-the-password-flow

const credentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type Credentials = z.infer<typeof credentialsSchema>;

export async function getTokenInfoByCredentials(credentials: Credentials): Promise<TokenInfoByCredentialsResult> {
  return httpClient.auth
    .post(
      `/oauth/${CTP_PROJECT_KEY}/customers/token`,
      {
        grant_type: 'password',
        ...credentialsSchema.parse(credentials),
        scope: createScope(customerTokenScopes),
      },
      {
        headers: createContentTypeHeader('urlencoded'),
        auth: CTP_BASIC_AUTH,
      }
    )
    .then(({ data }) => tokenInfoByCredentialsResultSchema.parse(data));
}
