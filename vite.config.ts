import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { createUnknownWebp } from './scripts/create_unknown_webp.js';

createUnknownWebp();

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3001,
        host: '0.0.0.0',
        strictPort: true,
      },
      plugins: [
        react(),
        tailwindcss(),
        {
          name: 'create-unknown-webp',
          buildStart() {
            createUnknownWebp();
          }
        }
      ],
      build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            manualChunks(id) {
              const normalizedId = id.replace(/\\/g, '/');
              if (
                normalizedId.includes('/node_modules/react/') ||
                normalizedId.includes('/node_modules/react-dom/') ||
                normalizedId.includes('/node_modules/react-router/') ||
                normalizedId.includes('/node_modules/scheduler/') ||
                normalizedId.includes('/node_modules/i18next/') ||
                normalizedId.includes('/node_modules/react-i18next/') ||
                normalizedId.includes('/node_modules/react-helmet-async/')
              ) {
                return 'vendor-core';
              }
              if (
                normalizedId.includes('/hsr-hub/data/characters/hsr/') ||
                normalizedId.endsWith('/hsr-hub/data/characters.ts')
              ) {
                return 'hsr-character-details';
              }
            },
          },
        },
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
