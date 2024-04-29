import axios, { AxiosError } from 'axios';
import { z } from 'zod';

import { CTP_API_URL, CTP_AUTH_URL, CTP_CLIENT_ID, CTP_CLIENT_SECRET, CTP_PROJECT_KEY } from './api-config';

import type { AxiosResponse } from 'axios';
import type { SignInDto } from './sign-in-dto.schema';

/** cURL
# create Anon Token
curl https://auth.{region}.commercetools.com/oauth/token --basic --user "{client_id}:{client_secret}" -X POST -d "grant_type=client_credentials&scope=view_published_products:{projectKey} manage_my_orders:{projectKey} manage_my_profile:{projectKey} view_categories:{projectKey} "

# sign up (create Customer)
curl -sH "Authorization: Bearer {access_token}" -X POST -d '{"firstName": "Alice","lastName": "Doe","email": "alice1@example.com","password": "secret"}' https://api.{region}.commercetools.com/{projectKey}/me/signup

# sign in (create Customer token)
curl https://auth.{region}.commercetools.com/oauth/{projectKey}/customers/token --basic --user "{client_id}:{client_secret}" -X POST -d "grant_type=password&username=alice@example.com&password=secret&scope=view_published_products:{projectKey} manage_my_orders:{projectKey} manage_my_profile:{projectKey} view_categories:{projectKey}"

use a token
curl -sH "Authorization: Bearer v-dZ10ZCpvbGfwcFniXqfkAj0vq1yZVI" https://api.{region}.commercetools.com/{projectKey}/me

*/

const apiClient = axios.create({
  baseURL: CTP_API_URL,
});

const toErrorMessageSchema = z
  .object({
    response: z.object({
      status: z.number().gte(400).lt(500),
      data: z.object({
        message: z.string(),
      }),
    }),
  })
  .transform(({ response: { data } }) => data.message);

apiClient.interceptors.response.use(
  (value) => value,
  (error) => Promise.reject(new AxiosError(toErrorMessageSchema.catch('Internal server error').parse(error)))
);

export function getToken(): void {}

export function signUp({ email, password }: SignInDto): Promise<AxiosResponse> {
  const endpoint = `/${CTP_PROJECT_KEY}/me/signup`;

  const url = new URL(endpoint, CTP_API_URL).toString();
  const payload = {
    firstName: 'Alice',
    lastName: 'Doe',
    email,
    password,
  };

  return apiClient.post(url, payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: CTP_CLIENT_ID,
      password: CTP_CLIENT_SECRET,
    },
  });
}

export function signIn({ email, password }: SignInDto): Promise<AxiosResponse> {
  const endpoint = `/oauth/${CTP_PROJECT_KEY}/customers/token`;

  const url = new URL(endpoint, CTP_AUTH_URL).toString();
  const payload = {
    grant_type: 'password',
    username: email,
    password,
    scope: ['view_published_products', 'manage_my_orders', 'manage_my_profile', 'view_categories']
      .map((scope) => `${scope}:${CTP_PROJECT_KEY}`)
      .join(' '),
  };

  return apiClient.post(url, payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: CTP_CLIENT_ID,
      password: CTP_CLIENT_SECRET,
    },
  });
}
