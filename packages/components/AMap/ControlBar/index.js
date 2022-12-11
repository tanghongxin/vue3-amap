import AMapControlBar from './index.vue';

AMapControlBar.install = function install(app) {
  app.component(AMapControlBar.name, AMapControlBar);
};

export default AMapControlBar;
