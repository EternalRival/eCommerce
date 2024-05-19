import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { toastifyError } from '~/shared/lib/react-toastify';

import type { SignUpDto } from '../model';

type UseSignUpMutationReturn = {
  isPending: boolean;
  signUp: (signUpDto: SignUpDto) => void;
};

type MutationFnReturn = unknown;

/* 
An email address that already exists in the system: Inform the user that an account with the provided email address already exists, and suggest that they either log in or use another email address. 📧🔒
Server-side issues during registration: Display a user-friendly error message to inform the user that something went wrong during the registration process and that they should try again later. ⚠️🔄
Invalid input that bypasses client-side validation: Ensure any input that somehow bypasses client-side validation is appropriately handled by backend error handling. 🔄🛡️
*/

export function useSignUpMutation(): UseSignUpMutationReturn {
  const { isPending, mutate } = useMutation<MutationFnReturn, Error, SignUpDto>({
    async mutationFn(signUpDto) {
      toast('отправил запрос');

      // TODO флоу регистрации (запрос)
      toast.info(String(signUpDto.isSingleAddressMode));
      // TODO флоу регистрации (парсинг ответа)

      return signUpDto.isSingleAddressMode ? 1 : 2;
    },
    async onSuccess(mutationFnReturn) {
      toast.success('Successful sign up');

      // TODO флоу успешной регистрации (сторы)
      toast.success(String(mutationFnReturn));
    },
    onError: toastifyError,
  });

  return { isPending, signUp: (signUpDto) => void mutate(signUpDto) };
}
