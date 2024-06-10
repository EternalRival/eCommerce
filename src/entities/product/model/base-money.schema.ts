import { z } from 'zod';

import { currencyCodeSchema } from '~/shared/api/commercetools';

export const baseMoneySchema = z.object({
  currencyCode: currencyCodeSchema,
  centAmount: z.number(),
  fractionDigits: z.number(),
});

export type BaseMoney = z.infer<typeof baseMoneySchema>;
