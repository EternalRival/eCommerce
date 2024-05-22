import { z } from 'zod';

export const imageSchema = z.object({
  url: z.string(),
  dimensions: z.object({
    w: z.number(),
    h: z.number(),
  }),
  label: z.string().optional(),
});

export type Image = z.infer<typeof imageSchema>;
