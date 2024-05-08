import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAuthStore } from '~/entities/auth-store';
import { getTokenInfoByCredentials, myCustomerSignIn, signInDtoSchema } from '~/shared/api/commercetools';
import { Route } from '~/shared/model/route.enum';
import { useCustomerStore } from '~/entities/customer-store';

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
  } = useForm<SignInDto>({
    defaultValues,
    resolver: zodResolver(signInDtoSchema),
    mode: 'onChange',
  });

  const authStore = useAuthStore((store) => store);
  const customerStore = useCustomerStore((store) => store);

  const router = useRouter();

  return {
    control,
    handleSubmit: handleSubmit(async (signInDto) => {
      try {
        const tokenInfo = await getTokenInfoByCredentials(signInDto);

        authStore.update(tokenInfo);

        const signInData = await myCustomerSignIn(tokenInfo.access_token, signInDto);

        customerStore.update(signInData.customer);

        await router.push(Route.ROOT);
      } catch (error) {
        if (!isAxiosError(error)) {
          throw error;
        }

        setError('root', { message: error.message });
      }
    }),
    errors,
  };
}
