import { CTP_PROJECT_KEY } from './api-config';

import type { Scope, StoreScope } from './scope.type';

export function createScope(scopes: Scope[]): string {
  return scopes.map((scope) => `${scope}:${CTP_PROJECT_KEY}`).join(' ');
}

export function createStoreScope(storeKey: string, scopes: StoreScope[]): string {
  return scopes.map((scope) => `${scope}:${CTP_PROJECT_KEY}:${storeKey}`).join(' ');
}
