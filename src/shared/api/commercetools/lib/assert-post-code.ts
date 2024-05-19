import { findPostCodeEntityByName } from './find-post-code-entity-by-name';

export function assertPostCode(country: string, postCode: string): void {
  const postCodeEntity = findPostCodeEntityByName(country);

  if (!postCodeEntity) {
    throw new Error('Country not found');
  }

  if (!postCodeEntity.regex.test(postCode)) {
    throw new Error(`Post code must follow ${postCodeEntity.format} format`);
  }
}
