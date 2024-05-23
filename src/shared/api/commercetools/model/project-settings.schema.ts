import { z } from 'zod';

export const localeSchema = z.enum(['en-US', 'en-GB', 'de-DE']);
export type Locale = z.infer<typeof localeSchema>;
export const countryCodeSchema = z.enum(['US', 'GB', 'DE']);
export type CountryCode = z.infer<typeof countryCodeSchema>;
export const currencyCodeSchema = z.enum(['GBP', 'USD', 'EUR']);
export type CurrencyCode = z.infer<typeof currencyCodeSchema>;
