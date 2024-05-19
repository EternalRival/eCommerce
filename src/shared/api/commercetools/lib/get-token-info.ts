import { CTP_BASIC_AUTH, httpClient, tokenInfoResultSchema } from '../model';
import { createContentTypeHeader } from './create-content-type-header';
import { createScope } from './create-scope';

import type { TokenInfoResult } from '../model';

export async function getTokenInfo(): Promise<TokenInfoResult> {
  return httpClient.auth
    .post(
      `/oauth/token`,
      {
        grant_type: 'client_credentials',
        scope: createScope(['manage_my_profile']), // ? добавить необходимое, убрать лишнее
      },
      {
        headers: createContentTypeHeader('urlencoded'),
        auth: CTP_BASIC_AUTH,
      }
    )
    .then(({ data }) => tokenInfoResultSchema.parse(data));
}
