import { z } from 'zod';

export const updateDtoSchema = z
  .object({
    access_token: z.string().nullable(),
    expires_in: z.number().nullable(),
    refresh_token: z.string().nullable(),
  })
  .partial()
  .strip();

export type UpdateDto = z.infer<typeof updateDtoSchema>;
