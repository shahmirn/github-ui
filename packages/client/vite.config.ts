import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
    coverage: {
      provider: 'v8',
      all: true,
      include: ['**/*.{ts,tsx}'],
      exclude: ['**/*.d.ts', 'src/types/*.{ts,tsx}'],
      reporter: ['text', 'html', 'clover', 'json', 'json-summary'],
    },
  },
});
