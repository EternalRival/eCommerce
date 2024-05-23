import { z } from 'zod';

import { customerReferenceSchema } from './customer-reference.schema';
import { attributionSchema } from './attribution.schema';

export const lastModifiedBySchema = z.object({
  clientId: z.string().optional(),
  externalUserId: z.string().optional(),
  customer: customerReferenceSchema.optional(),
  anonymousId: z.string().optional(),
  associate: customerReferenceSchema.optional(),
  attributedTo: attributionSchema.optional(),
});
