import { z } from 'zod';

export const currencyCodeSchema = z.enum(['EUR', 'GBP', 'USD']);
