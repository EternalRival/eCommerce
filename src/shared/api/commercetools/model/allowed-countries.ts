export const ALLOWED_COUNTRIES = (
  [
    { code: 'RU', label: 'Russia', format: 'NNNNNN' },
    { code: 'BY', label: 'Belarus', format: 'NNNNNN' },
    { code: 'PL', label: 'Poland', format: 'NN-NNN' },
    { code: 'KZ', label: 'Kazakhstan', format: 'NNNNNN' },
    { code: 'UA', label: 'Ukraine', format: 'NNNNN' },
  ] as const
).toSorted((a, b) => a.label.localeCompare(b.label));

export const ALLOWED_COUNTRY_NAMES = ALLOWED_COUNTRIES.map(({ label }) => label);

export type Country = (typeof ALLOWED_COUNTRIES)[number];
