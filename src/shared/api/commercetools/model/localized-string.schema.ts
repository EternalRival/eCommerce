import { z } from 'zod';

import { localeSchema } from './locale.schema';

export const localizedStringSchema = z.record(localeSchema, z.string());

export type LocalizedString = z.infer<typeof localizedStringSchema>;
