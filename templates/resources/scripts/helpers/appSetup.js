import { Head, Link } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import PortalVue, { Portal, PortalTarget } from 'portal-vue';
import { createApp, createSSRApp, h } from 'vue';
import { ZiggyVue } from 'ZiggyVue';

import Avatar from '@/views/components/Avatar.vue';
import Icon from '@/views/components/Icon.vue';

/**
 * Initialize inertia app and helpers.
 * - - - - - - - - - - - - - - - - - - */

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ({ el, App, props, plugin, page }) {
  /**
   * Initialize app, helpers and mixins.
   * - - - - - - - - - - - - - - - - - - */

  let vueApp = page !== undefined
    ? createSSRApp({ render: () => h(App, props) })
    : createApp({ render: () => h(App, props) });

  vueApp.mixin({
    methods: { dayjs },
  });

  vueApp.use(ZiggyVue, page !== undefined ? {
      ...page.props.ziggy,
      url: new URL(page.props.ziggy.location),
    } : Ziggy,
  );

  vueApp.use(PortalVue);
  vueApp.use(plugin);

  /**
   * Register global vue components.
   * - - - - - - - - - - - - - - - - - - */

  vueApp.component('inertia-link', Link);
  vueApp.component('inertia-head', Head);

  vueApp.component('portal', Portal);
  vueApp.component('portal-target', PortalTarget);

  vueApp.component('avatar', Avatar);
  vueApp.component('icon', Icon);

  /**
   * Mount app to element and window.
   * - - - - - - - - - - - - - - - - - - */

  if (el) vueApp.mount(el);

  return vueApp;
}
