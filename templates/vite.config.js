import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    host: 'localhost',
  },
  resolve: {
    extensions: [ '.js', '.vue', '.ts', '.jsx', '.tsx', '.json', '.mjs', '.css', '.scss' ],
    alias:      {
      '@':     path.resolve( path.dirname( fileURLToPath( import.meta.url ) ), 'resources' ),
      'ZiggyVue': '/vendor/tightenco/ziggy/dist/vue.m.js',
    },
  },
  plugins: [
    laravel({
      input: 'resources/scripts/app.js',
      ssr: 'resources/scripts/ssr.js',
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
});
