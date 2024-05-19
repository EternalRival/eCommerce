export const ALLOWED_COUNTRY_POSTCODES = [
  { name: 'Russia', regex: /^\d{6}$/, format: 'NNNNNN' },
  { name: 'Belarus', regex: /^\d{6}$/, format: 'NNNNNN' },
  { name: 'Ukraine', regex: /^\d{5}$/, format: 'NNNNN' },
  { name: 'Kazakhstan', regex: /^\d{6}$/, format: 'NNNNNN' },
].sort((a, b) => a.name.localeCompare(b.name));

export const ALLOWED_COUNTRIES = ALLOWED_COUNTRY_POSTCODES.map(({ name }) => name);

export type PostCodeEntity = (typeof ALLOWED_COUNTRY_POSTCODES)[number];
