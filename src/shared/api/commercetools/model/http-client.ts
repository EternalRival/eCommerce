import axios, { AxiosError } from 'axios';
import { z } from 'zod';

import { CTP_API_URL, CTP_AUTH_URL, CTP_BASIC_AUTH, CTP_PROJECT_KEY } from './api-config';

import type { Json } from '~/shared/lib/zod';

const errorSchema = z.object({
  message: z.string(),
});

const errorToErrorMessageSchema = z
  .object({
    response: z.object({
      status: z.number().gte(400).lt(500),
      data: errorSchema,
    }),
  })
  .transform(({ response: { data } }) => data.message);

const gqlResponseSchema = z
  .union([
    z.object({
      data: z.null(),
      errors: z.array(errorSchema),
    }),
    z.object({
      data: z.record(z.unknown()),
    }),
  ])
  .transform((response) =>
    response.data === null
      ? { data: null, error: response.errors.find((error) => error.message)?.message ?? 'Internal Server Error' }
      : response
  );

type GqlResponse = z.infer<typeof gqlResponseSchema>;

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

function onFulfilled<T>(value: T): T {
  return value;
}

function onRejected<T>(error: T): Promise<never> {
  return Promise.reject(new AxiosError(errorToErrorMessageSchema.catch('Internal server error').parse(error)));
}

api.interceptors.response.use(onFulfilled, onRejected);
auth.interceptors.response.use(onFulfilled, onRejected);

export const httpClient = {
  api,
  auth,
  async gql({
    token,
    ...body
  }: {
    token: Maybe<string>;
    query: string;
    operationName?: string;
    variables?: Json;
  }): Promise<NonNullable<GqlResponse['data']>> {
    if (!token) {
      throw new Error('No token provided');
    }

    return api
      .post(`/${CTP_PROJECT_KEY}/graphql`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        const gqlResponse = gqlResponseSchema.parse(data);

        if (gqlResponse.data === null) {
          throw new AxiosError(gqlResponse.error);
        }

        return gqlResponse.data;
      });
  },
};

export const $http = httpClient;
