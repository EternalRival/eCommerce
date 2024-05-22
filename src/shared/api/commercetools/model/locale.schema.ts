import { z } from 'zod';

export const localeSchema = z.enum(['en-US', 'en-GB', 'de-DE']);

export type Locale = z.infer<typeof localeSchema>;
