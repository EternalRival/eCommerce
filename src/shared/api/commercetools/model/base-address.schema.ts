import { z } from 'zod';

import { countryCodeSchema } from './country-code.schema';

export const baseAddressSchema = z.object({
  id: z.string().optional(),
  country: countryCodeSchema,
  streetName: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
});

export type BaseAddress = z.infer<typeof baseAddressSchema>;
