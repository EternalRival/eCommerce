import { ALLOWED_COUNTRY_NAMES } from '../model';

export function isAllowedCountryName(country: string): boolean {
  return ALLOWED_COUNTRY_NAMES.some((countryName) => country === countryName);
}
