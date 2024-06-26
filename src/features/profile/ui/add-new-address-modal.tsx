import { zodResolver } from '@hookform/resolvers/zod';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ALLOWED_COUNTRY_NAMES } from '~/shared/api/commercetools';
import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import {
  ControlledCheckbox,
  ControlledStringAutocomplete,
  ControlledTextField,
  MuiForm,
  SubmitButton,
} from '~/shared/ui';

import { addressFormDataSchema } from '../model';

import type { Dispatch, SetStateAction } from 'react';
import type { FCProps } from '~/shared/model/types';
import type { AddressFormData } from '../model';

export function AddNewAddressModal({
  open,
  setOpen,
}: FCProps<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>): JSX.Element {
  const [isPending, setIsPending] = useState(false);

  const defaultValues = {
    country: '',
    postalCode: '',
    city: '',
    street: '',
    isBilling: false,
    isDefaultBilling: false,
    isShipping: false,
    isDefaultShipping: false,
  };

  const { control, handleSubmit } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormDataSchema),
    mode: 'onChange',
    defaultValues,
  });

  const createProps = createFieldPropsFactory(control);

  return (
    <Modal open={open}>
      <Backdrop open={open}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Add new address</Typography>
          <MuiForm
            onSubmit={(event) =>
              void handleSubmit((formData) => {
                setIsPending(true);

                try {
                  toast(JSON.stringify(formData));
                } catch (error) {
                  toastifyError(error);
                }

                setIsPending(false);
              })(event)
            }
          >
            <ControlledStringAutocomplete
              {...createProps('country')}
              fieldProps={{ label: 'Country' }}
              options={ALLOWED_COUNTRY_NAMES}
            />
            <ControlledTextField
              {...createProps('postalCode')}
              fieldProps={{ label: 'Postal code' }}
            />
            <ControlledTextField
              {...createProps('city')}
              fieldProps={{ label: 'City' }}
            />
            <ControlledTextField
              {...createProps('street')}
              fieldProps={{ label: 'Street' }}
            />

            <Box className="grid grid-cols-2">
              <ControlledCheckbox
                {...createProps('isBilling')}
                labelProps={{ label: 'Billing' }}
              />
              <ControlledCheckbox
                {...createProps('isDefaultBilling')}
                labelProps={{ label: 'Default' }}
              />

              <ControlledCheckbox
                {...createProps('isShipping')}
                labelProps={{ label: 'Shipping' }}
              />
              <ControlledCheckbox
                {...createProps('isDefaultShipping')}
                labelProps={{ label: 'Default' }}
              />
            </Box>
            <Box className="grid grid-cols-2 gap-2">
              <Button
                variant="contained"
                className="my-2"
                onClick={() => void setOpen(false)}
              >
                Close
              </Button>
              <SubmitButton isPending={isPending} />
            </Box>
          </MuiForm>
        </Paper>
      </Backdrop>
    </Modal>
  );
}
