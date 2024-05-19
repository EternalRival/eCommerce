import { ALLOWED_COUNTRY_POSTCODES } from '../model';

import type { PostCodeEntity } from '../model';

export function findPostCodeEntityByName(name: string): Nullable<PostCodeEntity> {
  return ALLOWED_COUNTRY_POSTCODES.find((postCodeEnt) => postCodeEnt.name === name) ?? null;
}
