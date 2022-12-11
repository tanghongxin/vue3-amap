import AMapControlBar from './components/AMap/ControlBar/index';
import AMapFitView from './components/AMap/FitView/index';
import AMapGeolocation from './components/AMap/Geolocation/index';
import AMapMap from './components/AMap/Map/index';
import AMapMapType from './components/AMap/MapType/index';
import AMapMarker from './components/AMap/Marker/index';
import AMapScale from './components/AMap/Scale/index';
import AMapSearch from './components/AMap/Search/index';
import AMapToolbar from './components/AMap/Toolbar/index';
import AMapVector from './components/AMap/Vector/index';

export {
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

export default {
  install(app, options) {
    [
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
    ].forEach((Component) => {
      app.use(Component, options);
    });
  },
};
