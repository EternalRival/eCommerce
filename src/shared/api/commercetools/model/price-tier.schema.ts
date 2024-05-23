import { z } from 'zod';

import { typedMoneySchema } from './typed-money.schema';

export const priceTierSchema = z.object({
  minimumQuantity: z.number(),
  value: typedMoneySchema,
});
