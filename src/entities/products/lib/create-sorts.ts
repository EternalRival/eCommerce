import { z } from 'zod';

import { SortOption, defaultSortOption } from '../model';

const sortsSchema = z.enum([SortOption.PRICE_ASC, SortOption.PRICE_DESC, SortOption.NAME_ASC, SortOption.NAME_DESC]);

export function createSorts(sorts: string[]): string[] {
  return [sortsSchema.catch(defaultSortOption).parse(sorts[0])];
}
