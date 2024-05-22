import { z } from 'zod';

import { productVariantSchema } from './product-variant.schema';
import { localizedStringSchema } from './localized-string.schema';

export const productProjectionSchema = z.object({
  id: z.string(),
  version: z.number(),
  key: z.string().optional(),
  productType: z.unknown(),
  name: localizedStringSchema,
  description: localizedStringSchema.optional(),
  slug: localizedStringSchema,
  categories: z.array(z.unknown()),
  categoryOrderHints: z.unknown().optional(),
  metaTitle: localizedStringSchema.optional(),
  metaDescription: localizedStringSchema.optional(),
  metaKeywords: localizedStringSchema.optional(),
  searchKeywords: z.unknown().optional(),
  hasStagedChanges: z.boolean().optional(),
  published: z.boolean().optional(),
  masterVariant: productVariantSchema,
  variants: z.array(productVariantSchema),
  taxCategory: z.unknown().optional(),
  state: z.unknown().optional(),
  reviewRatingStatistics: z.unknown().optional(),
  priceMode: z.unknown().optional(),
  createdAt: z.unknown(),
  lastModifiedAt: z.unknown(),
});

export type ProductProjection = z.infer<typeof productProjectionSchema>;
