/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    publicDir: 'src/public',
    ssr: {
      noExternal: ['primeng/**'],
    },
    server: {
      fs: {
        allow: ['..'],
      },
    },
    build: {
      target: ['es2020'],
    },
    plugins: [
      analog({
        prerender: {
          routes: [
            '/',
            '/discover',
            '/events',
            '/cfp',
            '/communities',
            '/podcasts',
            '/tasks',
          ],
        },
      }),
      nxViteTsPaths(),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
