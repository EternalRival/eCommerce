import { z } from 'zod';

import { customerSchema } from './customer.schema';

// https://docs.commercetools.com/api/projects/customers#customersigninresult
export const customerSignInResultSchema = z.object({
  customer: customerSchema,
  cart: z.unknown().optional(),
});

export type CustomerSignInResult = z.infer<typeof customerSignInResultSchema>;
