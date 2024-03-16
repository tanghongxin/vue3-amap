declare namespace AMap {
  /**
   * @description plugins - 行政区查询、天气查询、公交站点和公交线路查询
   * https://lbs.amap.com/api/jsapi-v2/documentation#districtsearch
   */
  export class DistrictSearch {
    constructor(opts?: DistrictSearchOptions);

    /**
     * 设置关键字对应的行政区级别或商圈
     * @param level 可选值： country：国家 province：省/直辖市 city：市 district：区/县 biz_area：商圈
     */
    setLevel(level: DistrictSearchLevel): void;

    /**
     * 设置下级行政区级数（行政区级别包括：国家、省/直辖市、市、区/县4个级别）
     * @param subdistrict 商圈为区/县下一级，默认值：1 可选值：0、1、2、3 0：不返回下级行政区； 1：返回下一级行政区； 2：返回下两级行政区； 3：返回下三级行政区；
     */
    setSubdistrict(subdistrict?: DistrictSearchSubdistrict): void;

    /**
     * 根据关键字查询行政区或商圈信息
     * @param keyword
     * @param DistrictSearchCallBack
     * @param keywords
     */
    search(keyword: any, DistrictSearchCallBack: DistrictSearchCallBack, keywords): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  type DistrictSearchLevel = 'country' | 'province' | 'city' | 'district' | 'biz_area';
  type DistrictSearchSubdistrict = 0 | 1 | 2 | 3;

  export interface DistrictSearchOptions {
    level: DistrictSearchLevel;
    showbiz?: boolean;
    extensions?: 'base' | 'all';
    subdistrict?: DistrictSearchSubdistrict;
  }

  export interface DistrictSearchCallBack {
    status: 'complete' | 'error' | 'no_data';
    result: DistrictSearchResult | string | 0;
  }

  export interface DistrictSearchResult {
    info: string;
    districtList: Array<District>;
  }

  export interface District {
    name: string;
    center: AMap.LngLat;
    citycode: string;
    adcode: string;
    level: string;
    boundaries: AMap.LngLat;
    districtList: Array<District>;
  }
}
