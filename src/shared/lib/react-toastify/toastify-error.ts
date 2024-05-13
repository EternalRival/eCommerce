import { toast } from 'react-toastify';

export function toastifyError(error: unknown): void {
  if (!(error instanceof Error)) {
    throw error;
  }

  toast.error(error.message);
}
