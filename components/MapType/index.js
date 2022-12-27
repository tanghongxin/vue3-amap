import AMapMapType from './index.vue';

AMapMapType.install = function install(app) {
  app.component(AMapMapType.name, AMapMapType);
};

AMapMapType.plugins = [
  'AMap.MapType',
];

export default AMapMapType;
