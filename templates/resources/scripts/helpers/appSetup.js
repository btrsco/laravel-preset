import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import PortalVue from 'portal-vue';
import { createApp, createSSRApp, h } from 'vue';
import { ZiggyVue } from 'ZiggyVue';

import Components from '@/scripts/components';

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
    methods: { __, dayjs },
  });

  vueApp.use(ZiggyVue, page !== undefined ? {
      ...page.props.ziggy,
      url: new URL(page.props.ziggy.location),
    } : Ziggy,
  );

  vueApp.use(PortalVue);
  vueApp.use(Components);
  vueApp.use(plugin);

  /**
   * Mount app to element and window.
   * - - - - - - - - - - - - - - - - - - */

  if (el) vueApp.mount(el);

  return vueApp;
}
