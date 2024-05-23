import { z } from 'zod';

export const countryCodeSchema = z.enum(['GB', 'DE', 'US']);
