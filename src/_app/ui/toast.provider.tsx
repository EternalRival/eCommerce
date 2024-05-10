import { ToastContainer } from 'react-toastify';

import type { PropsWithChildren, ReactNode } from 'react';

type Props = Readonly<PropsWithChildren>;

export function ToastProvider({ children }: Props): ReactNode {
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
