import AMapMap from './index.vue';

AMapMap.install = function install(app, options) {
  app.component(AMapMap.name, AMapMap);
  app.config.globalProperties.$aMapOptions = options;
};

export default AMapMap;
