import AMapScale from './index.vue';

AMapScale.install = function install(app) {
  app.component(AMapScale.name, AMapScale);
};

AMapScale.plugins = [
  'AMap.Scale',
];

export default AMapScale;
