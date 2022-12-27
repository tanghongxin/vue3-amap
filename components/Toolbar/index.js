import AMapToolbar from './index.vue';

AMapToolbar.install = function install(app) {
  app.component(AMapToolbar.name, AMapToolbar);
};

AMapToolbar.plugins = [
  'AMap.ToolBar',
];

export default AMapToolbar;
