import { findCountryByLabel } from './find-country-by-label';

export function assertPostCode(countryLabel: string, postCode: string): void {
  const country = findCountryByLabel(countryLabel);

  if (!country) {
    throw new Error('Country not found');
  }

  if (!country.regex.test(postCode)) {
    throw new Error(`Post code must follow ${country.format} format`);
  }
}
