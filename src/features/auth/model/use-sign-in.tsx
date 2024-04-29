import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';

import { /* signIn,  */ signInDtoSchema } from '~/shared/api/commercetools';

import type { SignInDto } from '~/shared/api/commercetools';
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type UseSignInReturn<T extends Record<string, unknown>> = {
  register: UseFormRegister<T>;
  handleSubmit: ReturnType<UseFormHandleSubmit<T>>;
  errors: FieldErrors<T>;
};

export function useSignIn(): UseSignInReturn<SignInDto> {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInDto>({ resolver: zodResolver(signInDtoSchema), mode: 'onChange' });

  return {
    register,
    handleSubmit: handleSubmit(async (/* data */) => {
      try {
        // const kek = await signIn(data);
        // console.log(kek);
        /*    const res = await ctSignIn(data);
         console.log(res); */
      } catch (error) {
        if (!isAxiosError(error)) {
          throw error;
        }

        // console.log(error);
        // console.log(error.response);
        setError('root', { message: error.message });
      }
    }),
    errors,
  };
}
