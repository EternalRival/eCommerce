import type { AxiosRequestHeaders } from 'axios';

export function createAuthorizationHeader(
  token: string,
  tokenType = 'Bearer'
): Pick<AxiosRequestHeaders, 'Authorization'> {
  return { Authorization: `${tokenType} ${token}` };
}
