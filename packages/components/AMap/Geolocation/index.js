import AMapGeolocation from './index.vue';

AMapGeolocation.install = function install(app) {
  app.component(AMapGeolocation.name, AMapGeolocation);
};

export default AMapGeolocation;
