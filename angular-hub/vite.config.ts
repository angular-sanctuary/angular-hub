/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    publicDir: 'src/public',
    cacheDir: `../node_modules/.vite`,
    ssr: {
      noExternal: ['primeng/**'],
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
    build: {
      outDir: '../dist/./angular-hub/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    plugins: [
      analog({
        prerender: {
          routes: ['/', '/communities', '/podcasts'],
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
