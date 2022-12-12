import AMapMarker from './index.vue';

AMapMarker.install = function install(app) {
  app.component(AMapMarker.name, AMapMarker);
};

export default AMapMarker;
