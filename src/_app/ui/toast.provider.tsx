import { ToastContainer } from 'react-toastify';

import type { PropsWithChildren } from 'react';

type ToastProviderProps = Readonly<PropsWithChildren>;

export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  return (
    <>
      {children}
      <ToastContainer
        className="text-sm"
        position="bottom-left"
      />
    </>
  );
}
