import config from 'vue3-amap/src/core/config';
import * as components from '../components';

const install = function install(app, options = {}) {
  const plugins = new Set();

  Object.values(components).forEach((component) => {
    if (component.install) {
      app.use(component);
    }

    if (component.plugins) {
      component.plugins.forEach((plugin) => {
        if (!plugins.has(plugin)) {
          plugins.add(plugin);
        }
      });
    }
  });

  Object.assign(config, {
    ...options,
    plugins: Array.from(plugins),
  });
};

export default {
  // eslint-disable-next-line no-undef
  version: __VERSION__,
  install,
};
