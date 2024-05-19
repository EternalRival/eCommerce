export const ALLOWED_COUNTRY_POSTCODES = [
  { name: 'Russia', regex: /1/, example: 'Russia_postcode' },
  { name: 'Belarus', regex: /1/, example: 'Belarus_postcode' },
  { name: 'Ukraine', regex: /1/, example: 'Ukraine_postcode' },
  { name: 'Kazakhstan', regex: /1/, example: 'Kazakhstan_postcode' },
].sort((a, b) => a.name.localeCompare(b.name));

export const ALLOWED_COUNTRIES = ALLOWED_COUNTRY_POSTCODES.map(({ name }) => name);

export type PostCodeEntity = (typeof ALLOWED_COUNTRY_POSTCODES)[number];
