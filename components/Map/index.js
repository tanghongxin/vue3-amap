import AMapMap from './index.vue';

AMapMap.install = function install(app) {
  app.component(AMapMap.name, AMapMap);
};

export default AMapMap;
