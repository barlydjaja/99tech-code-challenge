import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import eslintPlugin from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    eslintPlugin({
      failOnError: true,
      failOnWarning: true,
      include: ['src/**/*.ts', 'src/**.*.tsx']
    }),
  ],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, './src') },
    ]
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://interview.switcheo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
