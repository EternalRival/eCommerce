import { z } from 'zod';

import { imageSchema } from './image.schema';
import { priceSchema } from './price.schema';

// https://docs.commercetools.com/api/projects/products#ctp:api:type:ProductVariant

export const productVariantSchema = z.object({
  id: z.number(),
  key: z.string().optional(),
  sku: z.string().optional(),
  prices: z.array(priceSchema).optional(),
  attributes: z.array(z.unknown()).optional(),
  price: priceSchema.optional(),
  images: z.array(imageSchema).optional(),
  assets: z.array(z.unknown()).optional(),
  availability: z.unknown().optional(),
  isMatchingVariant: z.boolean().optional(),
  scopedPrice: z.unknown().optional(),
  scopedPriceDiscounted: z.boolean().optional(),
});

export type ProductVariant = z.infer<typeof productVariantSchema>;
