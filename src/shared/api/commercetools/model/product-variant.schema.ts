import { z } from 'zod';

import { imageSchema } from './image.schema';

export const productVariantSchema = z.object({
  id: z.number(),
  key: z.string().optional(),
  sku: z.string().optional(),
  prices: z.array(z.unknown()).optional(),
  attributes: z.array(z.unknown()).optional(),
  price: z.unknown().optional(),
  images: z.array(imageSchema).optional(),
  assets: z.array(z.unknown()).optional(),
  availability: z.unknown().optional(),
  isMatchingVariant: z.boolean().optional(),
  scopedPrice: z.unknown().optional(),
  scopedPriceDiscounted: z.boolean().optional(),
});

export type ProductVariant = z.infer<typeof productVariantSchema>;
