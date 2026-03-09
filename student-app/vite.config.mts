import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/student-app',
  server: { port: 4200, host: 'localhost' },
  preview: { port: 4300, host: 'localhost' },
  plugins: [react(), nxViteTsPaths()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],  // ← fixes duplicate instance
  },
  build: {
    outDir: '../../dist/apps/student-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
});