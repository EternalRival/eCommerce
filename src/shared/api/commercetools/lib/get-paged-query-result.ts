import { CTP_PROJECT_KEY, httpClient, pagedQueryResultSchema } from '../model';
import { createAuthorizationHeader } from './create-authorization-header';

import type { PagedQueryResult } from '../model';

export async function getPagedQueryResult(token: string): Promise<PagedQueryResult> {
  return httpClient.api
    .get(`/${CTP_PROJECT_KEY}/product-projections/search`, {
      headers: createAuthorizationHeader(token),
    })
    .then(({ data }) => pagedQueryResultSchema.parse(data));
}
