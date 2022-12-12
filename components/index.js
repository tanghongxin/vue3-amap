import * as components from './components';

export * from './components';

export default {
  install(app, options) {
    Object.keys(components).forEach((key) => {
      const component = components[key];
      if (component.install) {
        app.use(component, options);
      }
    });
  },
};
