import { z } from 'zod';

import { baseAddressSchema } from './base-address.schema';

// https://docs.commercetools.com/api/projects/customers
export const customerSchema = z.object({
  id: z.string(),
  version: z.number(),
  email: z.string(),
  addresses: z.array(baseAddressSchema),
});

export type Customer = z.infer<typeof customerSchema>;
