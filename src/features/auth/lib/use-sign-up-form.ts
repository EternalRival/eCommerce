import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { dateFormat } from '~/shared/lib/dayjs';
import { createFieldPropsFactory, useRevalidateFactory } from '~/shared/lib/react-hook-form';

import { signUpDtoSchema } from '../model';

import type { UseFormHandleSubmit, UseFormWatch } from 'react-hook-form';
import type { CreateFieldProps } from '~/shared/lib/react-hook-form';
import type { SignUpDto } from '../model';

export function useSignUpForm(): {
  createProps: CreateFieldProps<SignUpDto>;
  handleSubmit: UseFormHandleSubmit<SignUpDto>;
  watch: UseFormWatch<SignUpDto>;
} {
  const { control, handleSubmit, watch, trigger, getFieldState } = useForm<SignUpDto>({
    resolver: zodResolver(signUpDtoSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: dayjs().format(dateFormat),
      shippingCountry: '',
      shippingPostalCode: '',
      shippingCity: '',
      shippingStreet: '',
      shippingIsDefault: true,
      isSingleAddressMode: true,
      billingCountry: '',
      billingPostalCode: '',
      billingCity: '',
      billingStreet: '',
      billingIsDefault: true,
    },
  });

  const useRevalidate = useRevalidateFactory({ watch, trigger, getFieldState });

  useRevalidate('shippingCountry', 'shippingPostalCode');
  useRevalidate('billingCountry', 'billingPostalCode');
  useRevalidate('isSingleAddressMode', 'billingCountry', 'billingPostalCode', 'billingCity', 'billingStreet');

  return { createProps: createFieldPropsFactory(control), handleSubmit, watch };
}
