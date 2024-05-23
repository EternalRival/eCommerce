import { z } from 'zod';

import { attributionSourceSchema } from './attribution-source.schema';

export const attributionSchema = z.object({ clientId: z.string().optional(), source: attributionSourceSchema });
