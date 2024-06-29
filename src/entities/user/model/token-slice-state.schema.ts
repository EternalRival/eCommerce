import { z } from 'zod';

const optionalNullSchema = z.null().optional().default(null);

const emptyTokenSchema = z.object({
  type: z.literal('empty'),
  access_token: optionalNullSchema,
  refresh_token: optionalNullSchema,
});

export const guestTokenSchema = z.object({
  type: z.literal('guest'),
  access_token: z.string(),
  refresh_token: optionalNullSchema,
});
export const customerTokenSchema = z.object({
  type: z.literal('customer'),
  access_token: z.string(),
  refresh_token: z.string(),
});

export const tokenSliceStateSchema = z.discriminatedUnion('type', [
  emptyTokenSchema,
  guestTokenSchema,
  customerTokenSchema,
]);

export type TokenSliceState = z.infer<typeof tokenSliceStateSchema>;
