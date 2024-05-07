import { z } from 'zod';

const apiConfig = z
  .object({
    CTP_PROJECT_KEY: z.string(),
    CTP_CLIENT_SECRET: z.string(),
    CTP_CLIENT_ID: z.string(),
    CTP_AUTH_URL: z.string(),
    CTP_API_URL: z.string(),
    CTP_SCOPES: z.string(),
  })
  .parse({
    CTP_PROJECT_KEY: process.env['NEXT_PUBLIC_CTP_PROJECT_KEY'],
    CTP_CLIENT_SECRET: process.env['NEXT_PUBLIC_CTP_CLIENT_SECRET'],
    CTP_CLIENT_ID: process.env['NEXT_PUBLIC_CTP_CLIENT_ID'],
    CTP_AUTH_URL: process.env['NEXT_PUBLIC_CTP_AUTH_URL'],
    CTP_API_URL: process.env['NEXT_PUBLIC_CTP_API_URL'],
    CTP_SCOPES: process.env['NEXT_PUBLIC_CTP_SCOPES'],
  } as const);

export const { CTP_PROJECT_KEY, CTP_AUTH_URL, CTP_API_URL, CTP_SCOPES } = apiConfig;

export const CTP_BASIC_AUTH = {
  username: apiConfig.CTP_CLIENT_ID,
  password: apiConfig.CTP_CLIENT_SECRET,
};
