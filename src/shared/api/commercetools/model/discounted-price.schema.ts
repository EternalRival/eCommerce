import { z } from 'zod';

import { typedMoneySchema } from './typed-money.schema';
import { productDiscountReferenceSchema } from './product-discount-reference.schema';

export const discountedPriceSchema = z.object({
  value: typedMoneySchema,
  discount: productDiscountReferenceSchema,
});
