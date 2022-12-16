import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import laravel from 'vite-plugin-laravel';
import vue from '@vitejs/plugin-vue';

export default defineConfig( {
    resolve: {
        extensions: [ '.js', '.vue', '.ts', '.jsx', '.tsx', '.json', '.mjs' ],
        alias:      {
            '@':     path.resolve( path.dirname( fileURLToPath( import.meta.url ) ), 'resources' ),
            'ziggy': '/vendor/tightenco/ziggy/dist/vue.es.js',
        },
    },
    plugins: [
        vue(),
        laravel( {
            postcss: [
                tailwindcss(),
                autoprefixer(),
            ],
        } ),
    ],
} );
