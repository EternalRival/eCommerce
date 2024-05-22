import { CTP_BASIC_AUTH, guestTokenScopes, httpClient, tokenInfoResultSchema } from '../model';
import { createContentTypeHeader } from './create-content-type-header';
import { createScope } from './create-scope';

import type { TokenInfoResult } from '../model';

export async function getTokenInfo(): Promise<TokenInfoResult> {
  return httpClient.auth
    .post(
      `/oauth/token`,
      {
        grant_type: 'client_credentials',
        scope: createScope(guestTokenScopes),
      },
      {
        headers: createContentTypeHeader('urlencoded'),
        auth: CTP_BASIC_AUTH,
      }
    )
    .then(({ data }) => tokenInfoResultSchema.parse(data));
}
