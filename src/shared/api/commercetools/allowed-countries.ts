export const ALLOWED_COUNTRY_POSTCODES = [
  { name: 'Russia', regex: /1/, example: 'Russia_postcode' },
  { name: 'Belarus', regex: /1/, example: 'Belarus_postcode' },
  { name: 'Ukraine', regex: /1/, example: 'Ukraine_postcode' },
  { name: 'Kazakhstan', regex: /1/, example: 'Kazakhstan_postcode' },
].sort((a, b) => a.name.localeCompare(b.name));

type PostCodeEntity = (typeof ALLOWED_COUNTRY_POSTCODES)[number];

export const ALLOWED_COUNTRIES = ALLOWED_COUNTRY_POSTCODES.map(({ name }) => name);

function findPostCodeEntityByName(name: string): Nullable<PostCodeEntity> {
  return ALLOWED_COUNTRY_POSTCODES.find((postCodeEnt) => postCodeEnt.name === name) ?? null;
}

export function isAllowedCountry(country: string): boolean {
  return ALLOWED_COUNTRIES.includes(country);
}

export function assertPostCode(country: string, postCode: string): void {
  const postCodeEntity = findPostCodeEntityByName(country);

  if (!postCodeEntity) {
    throw new Error('Country not found');
  }

  if (!postCodeEntity.regex.test(postCode)) {
    throw new Error(`Post code must follow ${postCodeEntity.example} format`);
  }
}
