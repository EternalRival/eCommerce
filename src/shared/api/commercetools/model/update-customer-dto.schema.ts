import { z } from 'zod';

import { myCustomerUpdateActionSchema } from './my-customer-update-action.schema';

export const updateCustomerDtoSchema = z.object({
  version: z.number(),
  actions: z.array(myCustomerUpdateActionSchema),
});

export type UpdateCustomerDto = z.infer<typeof updateCustomerDtoSchema>;
