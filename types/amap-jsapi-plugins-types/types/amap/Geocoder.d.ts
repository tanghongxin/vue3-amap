declare namespace AMap {
  /**
   * @description plugins - 地理编码与逆地理编码类
   * https://lbs.amap.com/api/jsapi-v2/documentation#geocoder
   */
  export class Geocoder {
    constructor(opts?: GeocoderOptions);

    /**
     * 将地址信息转化为高德经纬度坐标信息
     * @param keyword
     * @param cbk
     */
    getLocation(keyword: string, cbk: GeocoderCallback): void;

    /**
     * 地理编码时，设置地址描述所在城市
     * @param city
     */
    setCity(city: string): void;

    /**
     * 将高德经纬度坐标信息转化为结构化的地址信息
     * @param location
     * @param cbk
     */
    getAddress(location: AMap.LngLat | Array<AMap.LngLat> | [number, number], cbk: ReGeocoderCallback): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface GeocoderOptions {
    city?: string | 'citycode' | 'adcode';
    radius?: number;
    lang?: 'zh_cn' | 'en';
    batch?: boolean;
    extensions?: string;
  }

  // https://a.amap.com/jsapi/static/doc/20210906/index.html?v=2#geocodercallback
  export interface GeocoderCallback {
    (status: string, result: GeocoderResult): void;
  }

  // https://lbs.amap.com/api/webservice/guide/api/georegeo#geo
  interface GeocoderResult {
    info: string;
    geocode: {
      formatted_address: string;
      country: string;
      province: string;
      city: string;
      citycode: string;
      district: string;
      street: string;
      number: string;
      adcode: string;
      location: string;
      level: string;
    };
  }

  // https://a.amap.com/jsapi/static/doc/20210906/index.html?v=2#regeocodercallback
  export interface ReGeocoderCallback {
    (status: string, result: ReGeocoderResult): void;
  }

  // https://lbs.amap.com/api/webservice/guide/api/georegeo#regeo
  export interface ReGeocoderResult {
    info: string;
    regeocode: {
      formattedAddress: string;
    };
  }
}
