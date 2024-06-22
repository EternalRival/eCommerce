import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';

import { signInFormDataSchema } from '../model';

import type { UseFormHandleSubmit } from 'react-hook-form';
import type { CreateFieldProps } from '~/shared/lib/react-hook-form';
import type { SignInFormData } from '../model';

export function useSignInForm(): {
  createProps: CreateFieldProps<SignInFormData>;
  handleSubmit: UseFormHandleSubmit<SignInFormData>;
} {
  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormDataSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  return { createProps: createFieldPropsFactory(control), handleSubmit };
}
