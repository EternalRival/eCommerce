import { z } from 'zod';

export const moneyTypeSchema = z.enum(['centPrecision', 'highPrecision']);
