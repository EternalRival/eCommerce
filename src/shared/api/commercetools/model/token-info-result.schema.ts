import { z } from 'zod';

export const tokenInfoResultSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
});

export type TokenInfoResult = z.infer<typeof tokenInfoResultSchema>;
