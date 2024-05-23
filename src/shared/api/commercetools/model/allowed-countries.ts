export const ALLOWED_COUNTRIES = (
  [
    { code: 'DE', label: 'Germany', format: 'NNNNN' },
    { code: 'US', label: 'United States', format: 'NNNNN' },
    { code: 'GB', label: 'United Kingdom', format: 'A[A]N[A/N]' },
  ] as const
).toSorted((a, b) => a.label.localeCompare(b.label));

export const ALLOWED_COUNTRY_NAMES = ALLOWED_COUNTRIES.map(({ label }) => label);

export type Country = (typeof ALLOWED_COUNTRIES)[number];
