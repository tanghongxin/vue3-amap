import AMapSearch from './index.vue';

AMapSearch.install = function install(app) {
  app.component(AMapSearch.name, AMapSearch);
};

AMapSearch.plugins = [
  'AMap.AutoComplete',
  'AMap.PlaceSearch',
];

export default AMapSearch;
