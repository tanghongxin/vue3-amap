import {
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
} from '@rthx/vue3-amap';

declare module 'vue' {
  export interface GlobalComponents {
    AMapControlBar: typeof AMapControlBar;
    AMapFitView: typeof AMapFitView;
    AMapGeolocation: typeof AMapGeolocation;
    AMapMap: typeof AMapMap;
    AMapMapType: typeof AMapMapType;
    AMapMarker: typeof AMapMarker;
    AMapScale: typeof AMapScale;
    AMapSearch: typeof AMapSearch;
    AMapToolbar: typeof AMapToolbar;
    AMapVector: typeof AMapVector;
  }
}

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
