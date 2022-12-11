import AMapToolbar from './index.vue';

AMapToolbar.install = function install(app) {
  app.component(AMapToolbar.name, AMapToolbar);
};

export default AMapToolbar;
