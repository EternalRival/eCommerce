import { CTP_AUTH_URL, CTP_BASIC_AUTH, anonTokenInfoSchema, httpClient } from '../model';
import { createContentTypeHeader } from './create-content-type-header';
import { createScope } from './create-scope';

import type { AnonTokenInfo } from '../model';

export async function getTokenInfo(): Promise<AnonTokenInfo> {
  return httpClient.api
    .post(
      new URL(`/oauth/token`, CTP_AUTH_URL).toString(),
      {
        grant_type: 'client_credentials',
        scope: createScope([]),
      },
      {
        headers: createContentTypeHeader('urlencoded'),
        auth: CTP_BASIC_AUTH,
      }
    )
    .then(({ data }) => anonTokenInfoSchema.parse(data));
}
