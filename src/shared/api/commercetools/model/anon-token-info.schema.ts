import { z } from 'zod';

export const anonTokenInfoSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
});

export type AnonTokenInfo = z.infer<typeof anonTokenInfoSchema>;
