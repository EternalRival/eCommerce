import axios, { AxiosError } from 'axios';

import { CTP_API_URL } from './api-config';
import { errorToErrorMessageSchema } from './error-to-error-message.schema';

export const apiClient = axios.create({
  baseURL: CTP_API_URL,
});

apiClient.interceptors.response.use(
  (value) => value,
  (error) => Promise.reject(new AxiosError(errorToErrorMessageSchema.catch('Internal server error').parse(error)))
);
