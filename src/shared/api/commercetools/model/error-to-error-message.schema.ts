import { z } from 'zod';

export const errorToErrorMessageSchema = z
  .object({
    response: z.object({
      status: z.number().gte(400).lt(500),
      data: z.object({
        message: z.string(),
      }),
    }),
  })
  .transform(({ response: { data } }) => data.message);

export type ErrorMessage = z.infer<typeof errorToErrorMessageSchema>;
