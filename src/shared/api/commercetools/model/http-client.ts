import axios, { AxiosError } from 'axios';

import { CTP_API_URL, CTP_AUTH_URL, CTP_BASIC_AUTH, CTP_PROJECT_KEY } from './api-config';
import { errorToErrorMessageSchema } from './error-to-error-message.schema';

import type { AxiosResponse } from 'axios';
import type { Json } from '~/shared/lib/zod';

const onFulfilled = <T>(value: T): T => value;
const onRejected = <T>(error: T): Promise<never> =>
  Promise.reject(new AxiosError(errorToErrorMessageSchema.catch('Internal server error').parse(error)));

const api = axios.create({
  baseURL: CTP_API_URL,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
});
const auth = axios.create({
  baseURL: CTP_AUTH_URL,
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  auth: CTP_BASIC_AUTH,
});

export const $http = {
  api,
  auth,
  gql(token: string, body: { query: string; operationName?: string; variables?: Json }): Promise<AxiosResponse> {
    return api.post(`/${CTP_PROJECT_KEY}/graphql`, body, { headers: { Authorization: `Bearer ${token}` } });
  },
};

api.interceptors.response.use(onFulfilled, onRejected);
auth.interceptors.response.use(onFulfilled, onRejected);
