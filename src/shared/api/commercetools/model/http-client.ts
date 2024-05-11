import axios, { AxiosError } from 'axios';

import { CTP_API_URL, CTP_AUTH_URL } from './api-config';
import { errorToErrorMessageSchema } from './error-to-error-message.schema';

const onFulfilled = <T>(value: T): T => value;
const onRejected = <T>(error: T): Promise<never> =>
  Promise.reject(new AxiosError(errorToErrorMessageSchema.catch('Internal server error').parse(error)));

export const httpClient = {
  api: axios.create({ baseURL: CTP_API_URL }),
  auth: axios.create({ baseURL: CTP_AUTH_URL }),
};

httpClient.api.interceptors.response.use(onFulfilled, onRejected);
httpClient.auth.interceptors.response.use(onFulfilled, onRejected);
