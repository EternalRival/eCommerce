import { z } from 'zod';

import { passwordSchema } from './password.schema';

export const signInDtoSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
  })
  .strip();

export type SignInDto = z.infer<typeof signInDtoSchema>;
