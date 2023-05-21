import Avatar from '@/views/components/Avatar';
import Icon from '@/views/components/Icon';
import PageHead from '@/views/components/utils/PageHead';
import AppLayout from '@/views/layouts/AppLayout';
import {Head, Link} from '@inertiajs/vue3';
import { Portal, PortalTarget } from 'portal-vue';

export default {
  install: function (app) {
    registerComponents(app, {
      'inertia-link': Link,
      'inertia-head': Head,
      'portal': Portal, // duplicate registration
      'portal-target': PortalTarget, // duplicate registration
      'avatar': Avatar,
      'icon': Icon,
      'page-head': PageHead,
    });

    registerComponents(app, {
      'app-layout': AppLayout,
    });
  },
};

function registerComponents(app, components) {
  for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
  }
}
