import { z } from 'zod';

import { productProjectionSchema } from './product-projection-schema';

export const pagedQueryResultSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  count: z.number(),
  total: z.number().optional(),
  results: z.array(productProjectionSchema),
  facets: z.unknown().optional(),
  meta: z.unknown().optional(),
});

export type PagedQueryResult = z.infer<typeof pagedQueryResultSchema>;
