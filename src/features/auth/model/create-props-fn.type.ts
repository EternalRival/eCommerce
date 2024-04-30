import type { Control } from 'react-hook-form';
import type { ControlledTextFieldProps } from './controlled-text-field-props.type';

type FnProps<T extends Dict<unknown>> = {
  name: keyof T;
  control: Control<T>;
};

type FnReturn<T extends Dict<unknown>> = ControlledTextFieldProps<T>;

export type CreatePropsFn<T extends Dict<unknown>> = (props: FnProps<T>) => FnReturn<T>;

type FnFactoryProps<T extends Dict<unknown>> = Omit<FnProps<T>, 'name'>;

type FnFactoryReturn<T extends Dict<unknown>> = (name: FnProps<T>['name']) => FnReturn<T>;

export type CreatePropsFnFactory<T extends Dict<unknown>> = (props: FnFactoryProps<T>) => FnFactoryReturn<T>;
