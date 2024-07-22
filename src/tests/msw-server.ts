import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const authUrl = process.env['NEXT_PUBLIC_CTP_AUTH_URL'] ?? '';
const apiUrl = process.env['NEXT_PUBLIC_CTP_API_URL'] ?? '';

export const mswServer = setupServer(
  http.get(apiUrl, () => HttpResponse.json({})),
  http.post(`${authUrl}/oauth/token`, () =>
    HttpResponse.json({
      access_token: 'token',
      token_type: 'Bearer',
      expires_in: 65536,
      scope: 'some-scope',
    })
  )
);
