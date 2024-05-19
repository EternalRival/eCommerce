import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signInDtoSchema } from '../model';
import { createFieldPropsFactory } from './create-field-props-factory';

import type { UseFormHandleSubmit } from 'react-hook-form';
import type { SignInDto } from '../model';
import type { CreateFieldProps } from './create-field-props-factory';

export function useSignInForm(): {
  createProps: CreateFieldProps<SignInDto>;
  handleSubmit: UseFormHandleSubmit<SignInDto>;
} {
  const { control, handleSubmit } = useForm<SignInDto>({
    resolver: zodResolver(signInDtoSchema),
    mode: 'onChange',
    defaultValues: { email: 'customer@example.com', password: '!Q1qqqqq' },
  });

  return { createProps: createFieldPropsFactory(control), handleSubmit };
}
