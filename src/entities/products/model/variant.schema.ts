import { z } from 'zod';

import { priceSchema } from './price.schema';

export const variantSchema = z.object({
  price: priceSchema.nullish(),
  images: z.array(
    z.object({
      url: z.string(),
      label: z.string().nullish(),
      dimensions: z.object({
        width: z.number(),
        height: z.number(),
      }),
    })
  ),
});

export type Variant = z.infer<typeof variantSchema>;
