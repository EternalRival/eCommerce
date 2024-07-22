/// <reference types="vitest/globals" />
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    watch: false,
    coverage: {
      provider: 'v8',
      exclude: [
        '.next',
        'pages',
        '**/*{rc,.config}.{js,cjs,mjs,ts,cts,mts}',
        '**/*.{d,type}.ts',
        '**/*.{spec,test}.{ts,tsx}',
        '**/index.ts',
      ],
    },
    setupFiles: './src/tests/setup.ts',
  },
});
