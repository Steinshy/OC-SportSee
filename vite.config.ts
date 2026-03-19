import { defineConfig } from 'vite';
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
  manifest: {
    name: 'SportSee — Fitness Dashboard',
    short_name: 'SportSee',
    description: 'Modern fitness tracking dashboard with interactive charts and performance analytics',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    icons: [
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/dashboard.png',
        sizes: '540x720',
        form_factor: 'narrow',
      },
      {
        src: '/dashboard.png',
        sizes: '1024x768',
        form_factor: 'wide',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
    globIgnores: ['**/assets/background_*.jpg', '**/node_modules/**/*'],
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    cleanupOutdatedCaches: true,
    skipWaiting: true,
    clientsClaim: true,
    navigateFallback: '/index.html',
    navigateFallbackDenylist: [/^\/api\//, /\.[^/]+\.[^/]+$/],
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
      {
        urlPattern: /^https:\/\/.*\.json$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24,
          },
          networkTimeoutSeconds: 3,
        },
      },
    ],
  },
  devOptions: { enabled: false, type: 'module' },
});

export default defineConfig(({ mode }) => {
  // Common Build Options
  const buildOptions = {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: mode === 'production' ? false : true,
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
      output: {
        manualChunks: {
          // Split vendors
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-charts': ['recharts'],
          'vendor-utils': ['axios'],
        },
      },
    },
  };

  // Development Mode
  if (mode === 'development') {
    Object.assign({
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
    build: buildOptions,
    optimizeDeps: {
      include: ['axios', 'lucide-react', 'react', 'react-dom', 'react-router', 'recharts'],
    },
    preview: {
      host: 'localhost',
      port: 3000,
    },
  };
});
