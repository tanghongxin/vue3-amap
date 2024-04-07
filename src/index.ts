import { Plugin } from 'vue';
import config from './core/config';
import * as components from './components';

export * from './components';
export { useInjectMap } from './components/Map/composable';
export { ERR_DESC_MAP } from './core/error';

const install: Plugin = function install(app, options = {}) {
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
  version: __APP_VERSION__,
  install,
};
