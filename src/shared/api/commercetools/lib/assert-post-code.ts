import { postcodeValidator } from 'postcode-validator';

import { findCountryByLabel } from './find-country-by-label';

export function assertPostCode(countryLabel: string, postCode: string): void {
  const country = findCountryByLabel(countryLabel);

  if (!postcodeValidator(postCode, country.code)) {
    throw new Error(`Post code must follow country format (e.g. ${country.format})`);
  }
}
