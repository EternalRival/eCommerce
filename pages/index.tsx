import { Inter } from 'next/font/google';

import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home(): ReactNode {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>Main</main>
  );
}
