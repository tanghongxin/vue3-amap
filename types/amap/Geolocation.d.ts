declare namespace AMap {
  /**
   * @description plugins - 鹰眼控件，用于显示缩略地图，显示于地图右下角，可以随主图的视口变化而变化，也可以配置成固定位置实现类似于南海附图的效果。
   * https://lbs.amap.com/api/jsapi-v2/documentation#geolocation
   */
  export class Geolocation {
    constructor(options?: GeolocationOptions);

    /**
     * 获取用户的精确位置，有失败几率
     * @param  callback
     */
    getCurrentPosition(callback: GeolocationCallBack): void;

    /**
     * 根据用户IP获取 用户所在城市信息
     * @param callback
     */
    getCityInfo(callback: GeolocationCallBack): void;
  }

  export interface GeolocationOptions {
    position?: ControlConfig['position'];
    offset?: AMap.Vector2;
    borderColor?: string;
    borderRadius?: string;
    buttonSize?: string;
    convert?: boolean;
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
    showButton?: boolean;
    showCircle?: boolean;
    showMarker?: boolean;
    markerOptions?: AMap.MarkerOptions;
    circleOptions?: AMap.CircleMarkerOptions;
    panToLocation?: boolean;
    zoomToAccuracy?: boolean;
    GeoLocationFirst?: boolean;
    noIpLocate?: number;
    noGeoLocation?: number;
    useNative?: boolean;
    getCityWhenFail?: boolean;
    needAddress?: boolean;
    extensions?: string;
  }

  // export interface GeolocationCallBack {
  //   status: 'complete' | 'error';
  //   result: GeolocationResult;
  // }

  export type GeolocationCallBack = (status: 'complete' | 'error', result: GeolocationResult) => void

  export interface GeolocationResult {
    position: AMap.LngLat;
    accuracy: number;
    location_type: number;
    message: number;
    isConverted: number;
    info: 'SUCCESS' | 'PERMISSION_DENIED' | 'TIME_OUT' | 'POSITION_UNAVAILABLE';
    addressComponent: AddressComponent;
    formattedAddress: string;
    pois: Array<ReGeocodePoi>;
    roads: Array<Road>;
    crosses: Array<Cross>;
  }

  export interface AddressComponent {
    province: string;
    city: string;
    citycode: string;
    district: string;
    adcode: string;
    township: string;
    street: string;
    streetNumber: string;
    neighborhood: string;
    neighborhoodType: string;
    building: string;
    buildingType: string;
    businessAreas: Array<BusinessArea>;
  }

  export interface BusinessArea {
    id: string;
    name: string;
    location: string;
  }

  export interface ReGeocodePoi {
    id: string;
    name: string;
    type: string;
    tel: string;
    distance: number;
    direction: string;
    address: string;
    location: AMap.LngLat;
    businessArea: string;
  }

  export interface Road {
    id: string;
    name: string;
    distance: number;
    location: AMap.LngLat;
    direction: string;
  }

  export interface Cross {
    distance: number;
    direction: string;
    location: AMap.LngLat;
    first_id: string;
    first_name: string;
    second_id: string;
    second_name: string;
  }
}
