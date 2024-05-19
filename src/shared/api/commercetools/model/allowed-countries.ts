export const ALLOWED_COUNTRIES = [
  { code: 'RU', label: 'Russia', regex: /^\d{6}$/, format: 'NNNNNN' },
  { code: 'BY', label: 'Belarus', regex: /^\d{6}$/, format: 'NNNNNN' },
  { code: 'UA', label: 'Ukraine', regex: /^\d{5}$/, format: 'NNNNN' },
  { code: 'KZ', label: 'Kazakhstan', regex: /^\d{6}$/, format: 'NNNNNN' },
].sort((a, b) => a.label.localeCompare(b.label));

export const ALLOWED_COUNTRY_NAMES = ALLOWED_COUNTRIES.map(({ label }) => label);

export type Country = (typeof ALLOWED_COUNTRIES)[number];
