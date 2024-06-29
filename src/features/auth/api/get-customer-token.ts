import { z } from 'zod';

import { $http, CTP_PROJECT_KEY, createScope, customerTokenScopes } from '~/shared/api/commercetools';

const customerTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  refresh_token: z.string(),
});

const credentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type Credentials = z.infer<typeof credentialsSchema>;

type CustomerToken = z.infer<typeof customerTokenSchema>;

export async function getCustomerToken(credentials: Credentials): Promise<CustomerToken> {
  return $http.auth
    .post(`/oauth/${CTP_PROJECT_KEY}/customers/token`, {
      grant_type: 'password',
      ...credentialsSchema.parse(credentials),
      scope: createScope(customerTokenScopes),
    })
    .then(({ data }) => customerTokenSchema.parse(data));
}
