import type { Scope } from './scope.type';

// ? добавить необходимое, убрать лишнее

export const guestTokenScopes: Scope[] = ['manage_my_profile', 'view_products', 'view_categories'];

export const customerTokenScopes: Scope[] = ['manage_my_profile', 'view_products', 'view_categories'];
