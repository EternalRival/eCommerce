export { pagedQueryResult } from './__mocks__';
export {
  assertPostCode,
  findCountryByLabel,
  getPagedQueryResult,
  getTokenInfo,
  getTokenInfoByCredentials,
  isAllowedCountryName,
  signInCustomer,
  signUpCustomer,
  updateCustomer,
} from './lib';
export {
  ALLOWED_COUNTRIES,
  ALLOWED_COUNTRY_NAMES,
  httpClient,
  type BaseAddress,
  type Country,
  type Image,
  type Customer,
  type CustomerSignInResult,
  type MyCustomerDraft,
  type UpdateCustomerDto,
} from './model';
export type { ProductProjection } from './model';
