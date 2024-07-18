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
import { ControlledCheckbox, ControlledStringAutocomplete, ControlledTextField, MuiForm } from '~/shared/ui';

import { addressFormDataSchema } from '../model';
import { useSyncAddressStateFactory } from '../lib';

import type { Dispatch, JSX, SetStateAction } from 'react';
import type { AddressFormData } from '../model';

type AddNewAddressModalProps = Readonly<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>;

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

export function AddNewAddressModal({ open, setOpen }: AddNewAddressModalProps): JSX.Element {
  const [isPending, setIsPending] = useState(false);

  const { control, handleSubmit, reset, watch, setValue } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormDataSchema),
    mode: 'onChange',
    defaultValues,
  });

  const useSyncAddressState = useSyncAddressStateFactory({ setValue, watch });
  useSyncAddressState('isBilling', 'isDefaultBilling');
  useSyncAddressState('isShipping', 'isDefaultShipping');

  const createProps = createFieldPropsFactory(control);

  return (
    <Modal open={open}>
      <Backdrop
        open={open}
        sx={{ padding: 1 }}
      >
        <Paper sx={{ padding: 2, maxWidth: '28rem' }}>
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

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              <ControlledCheckbox
                {...createProps('isBilling')}
                labelProps={{ label: 'Billing', sx: { marginInline: 0 } }}
              />
              <ControlledCheckbox
                {...createProps('isDefaultBilling')}
                labelProps={{ label: 'Default', sx: { marginInline: 0 } }}
              />

              <ControlledCheckbox
                {...createProps('isShipping')}
                labelProps={{ label: 'Shipping', sx: { marginInline: 0 } }}
              />
              <ControlledCheckbox
                {...createProps('isDefaultShipping')}
                labelProps={{ label: 'Default', sx: { marginInline: 0 } }}
              />
            </Box>

            <Box sx={{ marginY: 1, display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
                sx={{ fontSize: { xs: 'small', sm: 'medium' } }}
              >
                Close
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                sx={{ fontSize: { xs: 'small', sm: 'medium' } }}
              >
                Add new address
              </Button>
            </Box>
          </MuiForm>
        </Paper>
      </Backdrop>
    </Modal>
  );
}
