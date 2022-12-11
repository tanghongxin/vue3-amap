import AMapFitView from './index.vue';

AMapFitView.install = function install(app) {
  app.component(AMapFitView.name, AMapFitView);
};

export default AMapFitView;
