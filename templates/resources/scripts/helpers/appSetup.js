import { createApp, h } from 'vue';
import { Link, Head } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';

import route from 'ziggy-js';
import { ZiggyVue } from 'ziggy';
import { Ziggy } from '@/scripts/helpers/ziggy';
import PortalVue, { Portal, PortalTarget } from 'portal-vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { __ } from '@/scripts/helpers/localization';

import pageHead from '@/views/components/utils/pageHead';
import avatar from '@/views/components/avatar';
import icon from '@/views/components/icon';

/**
 * Initialize inertia app and helpers.
 * - - - - - - - - - - - - - - - - - - */

dayjs.extend(utc);
dayjs.extend(timezone);

InertiaProgress.init({
    delay: 0, color: '#63cdee', includeCSS: true, showSpinner: true,
});

export default function ({ el, app, props, plugin }) {
    /**
     * Initialize app, helpers and mixins.
     * - - - - - - - - - - - - - - - - - - */

    const vueApp = createApp({ render: () => h(app, props) });

    vueApp.mixin({
        methods: { route, dayjs, __ },
    });

    Object.keys(Ziggy.routes).forEach((key) => {
        if (!Ziggy.routes[ key ].hasOwnProperty('domain')) {
            Ziggy.routes[ key ].domain = location.hostname;
        }
    });

    vueApp.use(ZiggyVue, Ziggy);
    vueApp.use(PortalVue);
    vueApp.use(plugin);

    /**
     * Register global vue helpers.
     * - - - - - - - - - - - - - - - - - - */

    // vueApp.config.globalProperties.bus = bus;

    /**
     * Register global vue components.
     * - - - - - - - - - - - - - - - - - - */

    vueApp.component( 'inertia-link', Link );
    vueApp.component( 'inertia-head', Head );

    vueApp.component('page-head', pageHead);

    vueApp.component('portal', Portal);
    vueApp.component('portal-target', PortalTarget);

    vueApp.component('avatar', avatar);
    vueApp.component('icon', icon);

    /**
     * Mount app to element and window.
     * - - - - - - - - - - - - - - - - - - */

    vueApp.mount(el);

    return vueApp;
}
