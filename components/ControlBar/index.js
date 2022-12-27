import AMapControlBar from './index.vue';

AMapControlBar.install = function install(app) {
  app.component(AMapControlBar.name, AMapControlBar);
};

AMapControlBar.plugins = [
  'AMap.ControlBar',
];

export default AMapControlBar;
