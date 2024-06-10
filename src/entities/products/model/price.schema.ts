import { z } from 'zod';

import { baseMoneySchema } from './base-money.schema';

export const priceSchema = z
  .object({
    value: baseMoneySchema,
    discounted: z
      .object({
        value: baseMoneySchema,
      })
      .nullish(),
  })
  .nullish();

export type Price = z.infer<typeof priceSchema>;
