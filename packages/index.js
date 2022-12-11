import AMapControlBar from './components/AMap/ControlBar/index.vue';
import AMapFitView from './components/AMap/FitView/index.vue';
import AMapGeolocation from './components/AMap/Geolocation/index.vue';
import AMapMap from './components/AMap/Map/index.vue';
import AMapMapType from './components/AMap/MapType/index.vue';
import AMapMarker from './components/AMap/Marker/index.vue';
import AMapPositionWatcher from './components/AMap/PositionWatcher/index.vue';
import AMapScale from './components/AMap/Scale/index.vue';
import AMapSearch from './components/AMap/Search/index.vue';
import AMapToolbar from './components/AMap/Toolbar/index.vue';
import AMapVector from './components/AMap/Vector/index.vue';

export default {
  install(app) {
    [
      AMapControlBar,
      AMapFitView,
      AMapGeolocation,
      AMapMap,
      AMapMapType,
      AMapMarker,
      AMapPositionWatcher,
      AMapScale,
      AMapSearch,
      AMapToolbar,
      AMapVector,
    ].forEach((Component) => {
      app.component(Component.name, Component);
    });
  },
};
