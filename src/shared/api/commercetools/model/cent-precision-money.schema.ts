import { z } from 'zod';

import { currencyCodeSchema } from './currency-code.schema';

export const centPrecisionMoneySchema = z.object({
  centAmount: z.string(),
  currencyCode: currencyCodeSchema,
  type: z.literal('centPrecision'),
  fractionDigits: z.number(),
});
