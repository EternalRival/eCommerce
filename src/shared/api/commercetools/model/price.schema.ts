import { z } from 'zod';

import { countryCodeSchema } from './country-code.schema';
import { typedMoneySchema } from './typed-money.schema';
import { discountedPriceSchema } from './discounted-price.schema';
import { priceTierSchema } from './price-tier.schema';

export const priceSchema = z.object({
  id: z.string(),
  key: z.string().optional(),
  value: typedMoneySchema,
  country: countryCodeSchema.optional(),
  customerGroup: z.unknown().optional(),
  channel: z.unknown().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  discounted: discountedPriceSchema.optional(),
  tiers: z.array(priceTierSchema).optional(),
  custom: z.unknown().optional(),
});

export type Price = z.infer<typeof priceSchema>;
