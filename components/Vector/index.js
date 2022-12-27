import AMapVector from './index.vue';

AMapVector.install = function install(app) {
  app.component(AMapVector.name, AMapVector);
};

AMapVector.plugins = [
  'AMap.MouseTool',
  'AMap.PolyEditor',
  'AMap.BezierCurveEditor',
  'AMap.RectangleEditor',
  'AMap.CircleEditor',
];

export default AMapVector;
