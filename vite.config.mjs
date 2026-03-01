import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }),
    tsconfigPaths(),
  ],
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    proxy: {
      '/user': 'http://localhost:3000',
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['axios', 'react', 'react-dom'],
  },
});
