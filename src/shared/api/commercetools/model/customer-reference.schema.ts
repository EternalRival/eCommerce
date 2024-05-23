import { z } from 'zod';

import { customerSchema } from './customer.schema';

export const customerReferenceSchema = z.object({ id: z.string(), typeId: z.string(), obj: customerSchema.optional() });
