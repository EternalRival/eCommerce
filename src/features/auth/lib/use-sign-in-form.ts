import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';

import { signInDtoSchema } from '../model';

import type { UseFormHandleSubmit } from 'react-hook-form';
import type { CreateFieldProps } from '~/shared/lib/react-hook-form';
import type { SignInDto } from '../model';

export function useSignInForm(): {
  createProps: CreateFieldProps<SignInDto>;
  handleSubmit: UseFormHandleSubmit<SignInDto>;
} {
  const { control, handleSubmit } = useForm<SignInDto>({
    resolver: zodResolver(signInDtoSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  return { createProps: createFieldPropsFactory(control), handleSubmit };
}
