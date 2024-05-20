import { z } from 'zod';

import { baseAddressSchema } from './base-address.schema';

export const myCustomerDraftSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  title: z.string().optional(),
  salutation: z.string().optional(),
  dateOfBirth: z.string().optional(),
  companyName: z.string().optional(),
  vatId: z.string().optional(),
  addresses: z.array(baseAddressSchema).optional(),
  defaultShippingAddress: z.number().optional(),
  defaultBillingAddress: z.number().optional(),
  locale: z.string().optional(),
  stores: z.unknown().optional(),
});
export type MyCustomerDraft = z.infer<typeof myCustomerDraftSchema>;
