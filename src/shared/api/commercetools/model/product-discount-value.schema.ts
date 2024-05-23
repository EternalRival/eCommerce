import { z } from 'zod';

import { centPrecisionMoneySchema } from './cent-precision-money.schema';

export const productDiscountValueSchema = z.union([
  z.object({ type: z.literal('relative'), permyriad: z.number() }),
  z.object({ type: z.literal('absolute'), money: z.array(centPrecisionMoneySchema) }),
  z.object({ type: z.literal('external') }),
]);
