import { z } from 'zod';

export const attributionSourceSchema = z.enum(['Import', 'Export']);
