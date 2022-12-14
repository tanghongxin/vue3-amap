import AMapControlBar from '../components/ControlBar/index';
import AMapFitView from '../components/FitView/index';
import AMapGeolocation from '../components/Geolocation/index';
import AMapMap from '../components/Map/index';
import AMapMapType from '../components/MapType/index';
import AMapMarker from '../components/Marker/index';
import AMapScale from '../components/Scale/index';
import AMapSearch from '../components/Search/index';
import AMapToolbar from '../components/Toolbar/index';
import AMapVector from '../components/Vector/index';

const components = {
  AMapControlBar,
  AMapFitView,
  AMapGeolocation,
  AMapMap,
  AMapMapType,
  AMapMarker,
  AMapScale,
  AMapSearch,
  AMapToolbar,
  AMapVector,
};

const install = function install(app, options) {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (component.install) {
      app.use(component, options);
    }
  });
};

export default {
  // eslint-disable-next-line no-undef
  version: __VERSION__,
  install,
  ...components,
};
