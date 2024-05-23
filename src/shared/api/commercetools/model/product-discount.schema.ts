import { z } from 'zod';

import { localizedStringSchema } from './localized-string.schema';
import { lastModifiedBySchema } from './last-modified-by.schema';
import { createdBySchema } from './created-by.schema';
import { referenceSchema } from './reference.schema';
import { productDiscountValueSchema } from './product-discount-value.schema';

export const productDiscountSchema = z.object({
  id: z.string(),
  version: z.number(),
  key: z.string().optional(),
  name: localizedStringSchema.optional(),
  description: localizedStringSchema.optional(),
  value: productDiscountValueSchema,
  predicate: z.string(),
  sortOrder: z.string(),
  isActive: z.boolean(),
  references: z.array(referenceSchema),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  createdAt: z.string(),
  createdBy: createdBySchema,
  lastModifiedAt: z.string(),
  lastModifiedBy: lastModifiedBySchema,
});
