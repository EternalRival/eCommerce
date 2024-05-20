import { CTP_PROJECT_KEY } from '../model';

type Scope =
  | 'create_anonymous_token'
  | 'manage_my_business_units'
  | 'manage_my_orders'
  | 'manage_my_payments'
  | 'manage_my_profile'
  | 'manage_my_quote_requests'
  | 'manage_my_quotes'
  | 'manage_my_shopping_lists'
  | 'view_categories'
  | 'view_published_products';

type StoreScope = Extract<Scope, 'manage_my_orders' | 'manage_my_profile' | 'manage_my_shopping_lists'>;

export function createScope(scopes: Scope[]): string {
  return scopes.map((scope) => `${scope}:${CTP_PROJECT_KEY}`).join(' ');
}

export function createStoreScope(storeKey: string, scopes: StoreScope[]): string {
  return scopes.map((scope) => `${scope}:${CTP_PROJECT_KEY}:${storeKey}`).join(' ');
}
