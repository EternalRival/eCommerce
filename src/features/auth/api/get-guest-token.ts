import { fetchTokenInfo } from '~/shared/api/commercetools';

import type { FetchTokenInfoResult } from '~/shared/api/commercetools';

export type GuestToken = FetchTokenInfoResult;

export async function getGuestToken(): Promise<GuestToken> {
  return fetchTokenInfo();
}
