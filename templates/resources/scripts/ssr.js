import appSetup from '@/scripts/helpers/appSetup';
import defaultLayout from '@/views/layouts/defaultLayout';
import { renderToString } from '@vue/server-renderer';
import createServer from '@inertiajs/server';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { resolvePageComponent } from 'vite-plugin-laravel/inertia';

/**
 * Initialize ssr inertia app.
 * - - - - - - - - - - - - - - - - - - */

const app = createServer((page) => createInertiaApp({
    page,
    render:  renderToString,
    resolve: (name) => resolvePageComponent(name,
          import.meta.glob('@/views/pages/**/*.vue'),
          defaultLayout),
    setup:   ({ el, app, props, plugin }) => appSetup(
          { el, app, props, plugin }),
}));
