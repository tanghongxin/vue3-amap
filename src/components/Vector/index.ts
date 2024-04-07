import AMapVector from './index.vue';
import { withInstall } from '~/utils';

AMapVector.install = function install(app) {
  app.component(AMapVector.name, AMapVector);
};

AMapVector.plugins = [
  'AMap.MouseTool',
  'AMap.PolygonEditor',
  'AMap.BezierCurveEditor',
  'AMap.RectangleEditor',
  'AMap.CircleEditor',
];

export default withInstall(AMapVector, [
  'AMap.MouseTool',
  'AMap.PolygonEditor',
  'AMap.BezierCurveEditor',
  'AMap.RectangleEditor',
  'AMap.CircleEditor',
]);
