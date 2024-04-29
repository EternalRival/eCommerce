import { z } from 'zod';

export const signInDtoSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/\d/, 'Password must contain at least one digit.')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .regex(/^\S.+\S$/, "Password mustn't contain leading or trailing whitespace."),
});

export type SignInDto = z.infer<typeof signInDtoSchema>;
