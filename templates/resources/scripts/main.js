import appSetup from '@/scripts/helpers/appSetup';
import defaultLayout from '@/views/layouts/defaultLayout';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'vite-plugin-laravel/inertia';

/**
 * Initialize inertia app and helpers.
 * - - - - - - - - - - - - - - - - - - */

InertiaProgress.init({
    delay:       0,
    color:       '#077EEE',
    includeCSS:  true,
    showSpinner: true,
});

const app = createInertiaApp({
    resolve: (name) => resolvePageComponent(name,
          import.meta.glob('@/views/pages/**/*.vue'),
          defaultLayout),
    setup:   ({ el, app, props, plugin }) => appSetup(
          { el, app, props, plugin }),
});
