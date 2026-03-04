import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  includeAssets: [
    'favicon.ico',
    'favicon.svg',
    'favicon-96x96.png',
    'apple-touch-icon.png',
    'site.webmanifest',
  ],
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
    globIgnores: ['**/assets/background_*.jpg'],
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    cleanupOutdatedCaches: true,
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
        },
      },
      {
        urlPattern: /\/api\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 10,
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 60 * 60 * 24 * 7,
          },
        },
      },
    ],
  },
  devOptions: { enabled: false, type: 'module' },
});

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const { visualizer } = await import('rollup-plugin-visualizer');
  // Common Server Options
  const commonServerOptions = {
    proxy: {
      '/api': {
        target: process.env.VITE_PUBLIC_API_SERVER || 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  };

  // Common Build Options
  const buildOptions = {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    cssCodeSplit: true,
    cssMinify: 'esbuild' as const,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild' as const,
    reportCompressedSize: true,
    modulePreload: {
        polyfill: true,
      },
    rollupOptions: {
      plugins: [
        visualizer({
          filename: 'dist/stats.html',
          open: false,
          gzipSize: true,
        }),
      ],
    },
  };

  // Development Mode
  if (mode === 'development') {
    Object.assign(commonServerOptions, {
      host: 'localhost',
      port: 5173,
    });
  }

  // Production Mode
  if (mode === 'production') {
    Object.assign(buildOptions, {
      sourcemap: false,
      manifest: true,
    });
  }

  return {
    plugins: [
      checker({ typescript: true }),
      tsconfigPaths(),
      react(),
      vitePWA,
    ],
    base: process.env.VITE_BASE_PATH || '/',
    publicDir: './public',
    server: commonServerOptions,
    build: buildOptions,
    optimizeDeps: {
      include: ['axios', 'lucide-react', 'react', 'react-dom', 'react-router', 'recharts'],
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
    },
  };
});
