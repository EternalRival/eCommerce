import { z } from 'zod';

import { createScope } from './create-scope';
import { $http } from './http-client';
import { guestTokenScopes } from './scopes';

export const tokenInfoResultSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
});

export type GetTokenInfoResult = z.infer<typeof tokenInfoResultSchema>;

export async function mutateGetTokenInfo(): Promise<GetTokenInfoResult> {
  return $http.auth
    .post('/oauth/token', {
      grant_type: 'client_credentials',
      scope: createScope(guestTokenScopes),
    })
    .then(({ data }) => tokenInfoResultSchema.parse(data));
}
