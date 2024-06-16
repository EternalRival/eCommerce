import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(1, 'Must contain at least one character')
  .regex(/[^!@#$%^&*]/, 'No special characters allowed')
  .regex(/\D/, 'No numbers allowed');
