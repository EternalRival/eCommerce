import { z } from 'zod';

import { priceSchema } from './price.schema';

export const variantSchema = z.object({
  price: priceSchema.nullish(),
  images: z.array(
    z.object({
      url: z.string(),
    })
  ),
});

export type Variant = z.infer<typeof variantSchema>;
