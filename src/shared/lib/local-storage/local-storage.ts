const PREFIX = '[er-commercetools-app]';

export function wrapStorageKey(key: string): string {
  return `${PREFIX}${key}`;
}
