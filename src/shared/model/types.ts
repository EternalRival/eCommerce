import type { PropsWithChildren } from 'react';

export type FCProps<T> = Readonly<T>;
export type FCPropsWC<T = unknown> = FCProps<PropsWithChildren<T>>;
