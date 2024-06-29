import { z } from 'zod';

const baseCategorySchema = z.object({
  id: z.string(),
  slug: z.string().nullish(),
  name: z.string().nullish(),
  parent: z
    .object({
      slug: z.string().nullish(),
    })
    .nullish(),
});

export type Category = z.infer<typeof baseCategorySchema> & {
  children: Category[];
};

export const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  children: z.lazy(() => categorySchema.array()),
});
