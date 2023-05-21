import '@/scss/app.scss';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import appSetup from '@/scripts/helpers/appSetup';

const appName = window.document.getElementsByTagName('title')[ 0 ]?.innerText ||
  import.meta.env.VITE_APP_NAME;

createInertiaApp({
  title: (title) => `${ title } - ${ appName }`,
  resolve: (name) => resolvePageComponent(
    `/resources/views/pages/${ name }.vue`,
    import.meta.glob('/resources/views/pages/**/*.vue'),
  ),
  setup: ({ el, App, props, plugin }) => appSetup({ el, App, props, plugin }),
  progress: { color: '# 4b5563' },
});
