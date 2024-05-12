import { z } from 'zod';

import { CTP_BASIC_AUTH, httpClient } from '../model';
import { createContentTypeHeader } from './create-content-type-header';
import { createScope } from './create-scope';

const anonTokenInfoSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
});

type AnonTokenInfo = z.infer<typeof anonTokenInfoSchema>;

export async function getTokenInfo(): Promise<AnonTokenInfo> {
  return httpClient.auth
    .post(
      `/oauth/token`,
      {
        grant_type: 'client_credentials',
        scope: createScope(['manage_my_profile']), // TODO добавить необходимое, убрать лишее
      },
      {
        headers: createContentTypeHeader('urlencoded'),
        auth: CTP_BASIC_AUTH,
      }
    )
    .then(({ data }) => anonTokenInfoSchema.parse(data));
}
