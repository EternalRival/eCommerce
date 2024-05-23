import { z } from 'zod';

import { currencyCodeSchema } from './currency-code.schema';
import { moneyTypeSchema } from './money-type.schema';

export const typedMoneySchema = z.object({
  centAmount: z.number(),
  currencyCode: currencyCodeSchema,
  type: moneyTypeSchema,
  fractionDigits: z.number(),
});
