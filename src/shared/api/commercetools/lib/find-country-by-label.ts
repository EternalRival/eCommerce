import { ALLOWED_COUNTRIES } from '../model';

import type { Country } from '../model';

export function findCountryByLabel(name: string): Country {
  const country = ALLOWED_COUNTRIES.find(({ label }) => label === name);

  if (!country) {
    throw new Error('Country not found');
  }

  return country;
}
