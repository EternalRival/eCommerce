import { z } from 'zod';

import { baseAddressSchema } from './base-address.schema';

export const myCustomerDraftSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  addresses: z.array(baseAddressSchema).optional(),
});

export type MyCustomerDraft = z.infer<typeof myCustomerDraftSchema>;
