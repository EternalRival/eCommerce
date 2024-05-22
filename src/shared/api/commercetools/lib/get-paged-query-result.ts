import { CTP_PROJECT_KEY, httpClient, pagedQueryResultSchema } from '../model';

import type { PagedQueryResult } from '../model';

export async function getPagedQueryResult(): Promise<PagedQueryResult> {
  return httpClient.api
    .get(`/${CTP_PROJECT_KEY}/product-projections/search`, {
      headers: {},
    })
    .then(({ data }) => pagedQueryResultSchema.parse(data));
}
