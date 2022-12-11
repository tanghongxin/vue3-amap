import AMapSearch from './index.vue';

AMapSearch.install = function install(app) {
  app.component(AMapSearch.name, AMapSearch);
};

export default AMapSearch;
