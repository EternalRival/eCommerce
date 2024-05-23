import { z } from 'zod';

import { referenceTypeIdSchema } from './reference-type-id.schema';

export const referenceSchema = z.object({ id: z.string(), typeId: referenceTypeIdSchema.optional() });
