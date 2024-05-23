import { z } from 'zod';

import { productDiscountSchema } from './product-discount.schema';

export const productDiscountReferenceSchema = z.object({
  id: z.string(),
  typeId: z.string(),
  obj: productDiscountSchema.optional(),
});
