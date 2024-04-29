import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signInDtoSchema } from '~/shared/api/commercetools';

import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import type { SignUpDto } from '~/shared/api/commercetools';

type UseSignUpReturn<T extends Record<string, unknown>> = {
  register: UseFormRegister<T>;
  handleSubmit: ReturnType<UseFormHandleSubmit<T>>;
  errors: FieldErrors<T>;
};

export function useSignUp(): UseSignUpReturn<SignUpDto> {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpDto>({ resolver: zodResolver(signInDtoSchema), mode: 'onChange' });

  return {
    register,
    handleSubmit: handleSubmit(async (/* data */) => {
      try {
        /* const kek = await signIn('credentials');
        console.log(kek); */
        /*    const res = await ctSignIn(data);
        console.log(res); */
      } catch {
        setError('root', { message: 'woo' });
      }
    }),
    errors,
  };
}
