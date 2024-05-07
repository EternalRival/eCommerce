import { z } from 'zod';

export const tokenInfoSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(), // 172800 seconds (2 days)
  scope: z.string(),
  refresh_token: z.string().optional(),
});

export type TokenInfo = z.infer<typeof tokenInfoSchema>;
