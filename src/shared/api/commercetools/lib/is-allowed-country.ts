import { ALLOWED_COUNTRIES } from '../model';

export function isAllowedCountry(country: string): boolean {
  return ALLOWED_COUNTRIES.includes(country);
}
