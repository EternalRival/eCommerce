import { z } from 'zod';

export const customerTokenInfoSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  refresh_token: z.string(),
});

export type CustomerTokenInfo = z.infer<typeof customerTokenInfoSchema>;
