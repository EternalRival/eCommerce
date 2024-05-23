import { $http, guestTokenScopes, tokenInfoResultSchema } from '../model';
import { createScope } from './create-scope';

import type { TokenInfoResult } from '../model';

export async function getTokenInfo(): Promise<TokenInfoResult> {
  return $http.auth
    .post(`/oauth/token`, {
      grant_type: 'client_credentials',
      scope: createScope(guestTokenScopes),
    })
    .then(({ data }) => tokenInfoResultSchema.parse(data));
}
