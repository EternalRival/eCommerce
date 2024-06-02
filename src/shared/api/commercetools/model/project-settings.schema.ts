import { z } from 'zod';

export const localeSchema = z.enum(['en']);
export type Locale = z.infer<typeof localeSchema>;

export const countryCodeSchema = z.enum(['RU', 'BY', 'PL', 'KZ', 'UA']);
export type CountryCode = z.infer<typeof countryCodeSchema>;

export const currencyCodeSchema = z.enum(['USD']);
export type CurrencyCode = z.infer<typeof currencyCodeSchema>;
