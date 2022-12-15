import * as components from '../components';

export * from '../components';

const install = function install(app, options) {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (component.install) {
      app.use(component, options);
    }
  });
};

export default {
  // eslint-disable-next-line no-undef
  version: __VERSION__,
  install,
  ...components,
};
