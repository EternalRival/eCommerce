import type { AxiosRequestHeaders } from 'axios';

const contentTypes = {
  json: 'application/json',
  urlencoded: 'application/x-www-form-urlencoded',
} as const;

export function createContentTypeHeader(type: keyof typeof contentTypes): Pick<AxiosRequestHeaders, 'Content-Type'> {
  return { 'Content-Type': contentTypes[type] };
}
