import axios, { AxiosError } from 'axios';

import { CTP_API_URL } from './api-config';
import { errorToErrorMessageSchema } from './error-to-error-message.schema';

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

export const apiClient = axios.create({
  baseURL: CTP_API_URL,
});

apiClient.interceptors.response.use(
  (value) => value,
  (error) => Promise.reject(new AxiosError(errorToErrorMessageSchema.catch('Internal server error').parse(error)))
);
