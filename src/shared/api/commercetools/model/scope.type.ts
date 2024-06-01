export type Scope =
  | 'create_anonymous_token'
  | 'manage_my_business_units'
  | 'manage_my_orders'
  | 'manage_my_payments'
  | 'manage_my_profile'
  | 'manage_my_quote_requests'
  | 'manage_my_quotes'
  | 'manage_my_shopping_lists'
  | 'view_categories'
  | 'view_products'
  | 'view_published_products';

export type StoreScope = Extract<Scope, 'manage_my_orders' | 'manage_my_profile' | 'manage_my_shopping_lists'>;
