import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signUpDtoSchema } from '~/shared/api/commercetools';

import type { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import type { SignUpDto } from '~/shared/api/commercetools';

type UseSignUpReturn<T extends Record<string, unknown>> = {
  control: Control<T>;
  handleSubmit: ReturnType<UseFormHandleSubmit<T>>;
  errors: FieldErrors<T>;
};

export function useSignUp(defaultValues: SignUpDto): UseSignUpReturn<SignUpDto> {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpDto>({
    defaultValues,
    resolver: zodResolver(signUpDtoSchema),
    mode: 'onChange',
  });

  return {
    control,
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
