import type { SearchFilterInput } from '../model';

export function createCategoryFilter({ id }: { id: string }): SearchFilterInput {
  return { string: `categories.id:subtree("${id}")` };
}

export function createEnumAttributeFilter({ key, values }: { key: string; values: string[] }): SearchFilterInput {
  const formattedValues = values.map((value) => `"${value}"`);

  return { string: `variants.attributes.${key}.key:${formattedValues.toString()}` };
}

export function createPriceFilter({ from, to }: { from: Maybe<string>; to: Maybe<string> }): SearchFilterInput {
  return { string: `variants.price.centAmount:range(${from ?? '0'} to ${to ?? '*'})` };
}
