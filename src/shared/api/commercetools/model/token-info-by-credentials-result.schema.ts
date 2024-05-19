import { z } from 'zod';

export const tokenInfoByCredentialsResultSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  refresh_token: z.string(),
});
export type TokenInfoByCredentialsResult = z.infer<typeof tokenInfoByCredentialsResultSchema>;
