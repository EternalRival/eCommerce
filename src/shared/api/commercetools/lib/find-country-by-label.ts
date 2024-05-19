import { ALLOWED_COUNTRIES } from '../model';

import type { Country } from '../model';

export function findCountryByLabel(name: string): Nullable<Country> {
  return ALLOWED_COUNTRIES.find(({ label }) => label === name) ?? null;
}
