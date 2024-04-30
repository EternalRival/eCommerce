import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';

import { /* signIn,  */ signInDtoSchema } from '~/shared/api/commercetools';

import type { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import type { SignInDto } from '~/shared/api/commercetools';

type UseSignInReturn<T extends Dict<unknown>> = {
  control: Control<T>;
  handleSubmit: ReturnType<UseFormHandleSubmit<T>>;
  errors: FieldErrors<T>;
};

export function useSignIn(defaultValues: SignInDto): UseSignInReturn<SignInDto> {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInDto>({ defaultValues, resolver: zodResolver(signInDtoSchema), mode: 'onChange' });

  return {
    control,
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
