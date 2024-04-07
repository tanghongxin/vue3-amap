declare namespace AMap {
  /**
   * @description plugins - 地点搜索服务，提供某一特定地区的位置查询服务
   * https://lbs.amap.com/api/jsapi-v2/documentation#placesearch
   */
  export class PlaceSearch {
    constructor(options?: PlaceSearchOptions);

    /**
     * 根据输入关键字提示匹配信息，支持中文、拼音
     * @param keyword
     * @param callback
     */
    search(keyword: string, callback: PlaceSearchSearchCallback): void;

    /**
     * 根据范围和关键词进行范围查询
     * @param keyword
     * @param bounds
     * @param callback
     */
    searchInBounds(keyword: string, bounds: AMap.Bounds, callback: PlaceSearchSearchCallback): void;

    /**
     * 根据中心点经纬度、半径以及关键字进行周边查询 radius取值范围：0-50000
     * @param keyword
     * @param center
     * @param radius
     */
    searchNearBy(keyword: string, center: AMap.LngLat, radius: number): void;

    /**
     * 根据PGUID 查询POI 详细信息
     * @param PGUID
     * @param callback
     */
    getDetails(PGUID: string, callback: PlaceSearchSearchCallback): void;

    /**
     * 设置查询类别，多个类别用“|”分割
     * @param type
     */
    setType(type: string): void;

    /**
     * 设置显示查询结果页码
     * @param pageIndex
     */
    setPageIndex(pageIndex: number): void;

    /**
     * 设置每页显示查询结果数量
     * @param pageSize
     */
    setPageSize(pageSize: number): void;

    /**
     * 设置查询城市, 支持cityname（中文或中文全拼）、citycode、adcode
     * @param city
     */
    setCity(city: string): void;

    /**
     * 设置是否强制限制城市
     * @param citylimit
     */
    setCityLimit(citylimit: boolean): void;

    /**
     * 唤起高德地图客户端marker页
     * @param p
     * @param opts
     */
    poiOnAMAP(p: any, opts: object): void;

    /**
     * 唤起高德地图客户端POI详情页
     * @param p
     * @param opts
     */
    detailOnAMAP(p: any, opts: object): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  interface PlaceSearchOptions {
    city?: string;
    citylimit?: boolean;
    children?: number;
    type?: string;
    lang?: string;
    pageSize?: number;
    pageIndex?: number;
    extensions?: string;
    map?: AMap.Map;
    panel?: string | HTMLElement;
    showCover?: boolean;
    renderStyle?: string;
    autoFitView?: boolean;
  }

  interface PlaceSearchSearchCallback {
    status: 'complete' | 'error' | 'no_data';
    result: PlaceSearchSearchResult | string | 0;
  }

  interface PlaceSearchSearchResult {
    info: string;
    keywordList: Array<string>;
    cityList: Array<{
      name: string;
      citycode: string;
      adcode: string;
      count: string;
    }>;
    poiList: {
      pageIndex: number;
      pageSize: number;
      count: number;
      pois: Array<{
        id: string;
        name: string;
        type: string;
        location: AMap.LngLat;
        address: string;
        distance: number;
        tel: string;
        website: string;
        pcode: string;
        citycode: string;
        adcode: string;
        postcode: string;
        pname: string;
        cityname: string;
        adname: string;
        email: string;
        entr_location: AMap.LngLat;
        exit_location: AMap.LngLat;
      }>;
    };
  }
}
