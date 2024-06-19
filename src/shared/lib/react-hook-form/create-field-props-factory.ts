import type { Control, FieldValues, Path } from 'react-hook-form';

export type CreateFieldProps<T extends FieldValues> = (name: Path<T>) => { control: Control<T>; name: Path<T> };

export function createFieldPropsFactory<T extends FieldValues>(control: Control<T>): CreateFieldProps<T> {
  return (name) => ({ control, name });
}
