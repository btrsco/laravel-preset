import { createApp, h } from 'vue';
import { createInertiaApp, Link, Head } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'vite-plugin-laravel/inertia';

import route from 'ziggy-js';
import { ZiggyVue } from 'ziggy';
import { Ziggy } from '@/js/ziggy';

import primaryLayout from '@/views/layouts/primaryLayout.vue';

/**
 * Initialize inertia app and helpers.
 * - - - - - - - - - - - - - - - - - - */

// const bus = mitt();

InertiaProgress.init( {
    delay:       0,
    color:       '#63cdee',
    includeCSS:  true,
    showSpinner: true,
} );

const inertiaApp = createInertiaApp( {
    resolve: ( name ) => resolvePageComponent( name, import.meta.glob( '@/views/pages/**/*.vue' ), primaryLayout ),
    setup( { el, app, props, plugin } ) {
        /**
         * Initialize app, helpers and mixins.
         * - - - - - - - - - - - - - - - - - - */

        const vueApp = createApp( { render: () => h( app, props ) } );

        vueApp.mixin( {
            methods: { route },
        } );

        vueApp.use( ZiggyVue, Ziggy );
        vueApp.use( plugin );


        /**
         * Register global vue helpers.
         * - - - - - - - - - - - - - - - - - - */

        // vueApp.config.globalProperties.bus = bus;


        /**
         * Register global vue components.
         * - - - - - - - - - - - - - - - - - - */

        vueApp.component( 'i-link', Link );
        vueApp.component( 'i-head', Head );


        /**
         * Mount app to element and window.
         * - - - - - - - - - - - - - - - - - - */

        vueApp.mount( el );
        return vueApp;
    }
} );
