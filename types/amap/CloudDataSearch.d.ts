declare namespace AMap {
  /**
   * @description plugins - 云数据检索服务类
   * https://lbs.amap.com/api/jsapi-v2/documentation#clouddatasearch
   */
  export class CloudDataSearch {
    constructor(tableid: string, opts?: CloudDataSearchOptions);

    /**
     * 设置云数据检索属性
     * @param opts
     */
    setOptions(opts: CloudDataSearchOptions): void;

    /**
     * 清除搜索结果
     */
    clear(): void;

    /**
     * 周边检索，根据指定的中心点和半径检索位置数据
     * @param center
     * @param radius
     * @param callback
     */
    searchNearBy(center: AMap.LngLat, radius: number, callback: CloudDataSearchCallback): void;

    /**
     * 根据数据id检索位置数据，id检索时不需要设置CloudDataSearchOptions
     * @param id
     * @param callback
     */
    searchById(id: string, callback: CloudDataSearchCallback): void;

    /**
     * 根据行政区划（包括全国/省/市/区县）名称，检索行政区划内位置数据
     * @param district
     * @param callback
     */
    searchByDistrict(district: string, callback: CloudDataSearchCallback): void;

    /**
     * 多边形检索，根据给定的多边形节点坐标数组，检索位置数据。如果数组只有两个坐标元素，则认为多边形为矩形，这两个点为矩形的左下、右上点。多边形坐标数组的起、终点必须保证多边形闭合（起、终点坐标相同）
     * @param path
     * @param callback
     */
    searchInPolygon(path: Array<AMap.LngLat>, callback: CloudDataSearchCallback): void;
  }

  export interface CloudDataSearchOptions {
    map?: AMap.Map;
    keywords?: string;
    filter?: string;
    orderBy?: string;
    pageSize?: number;
    pageIndex?: number;
    panel?: string | HTMLElement;
    autoFitView?: boolean;
  }

  export interface CloudDataSearchCallback {
    status: 'complete' | 'error' | 'no_data';
    result: CloudDataSearchResult | string | 0;
  }

  export interface CloudDataSearchResult {
    info: string;
    count: number;
    datas: Array<any>;
    _id: string;
    _name: string;
    _location: AMap.LngLat;
    _address: string;
    _updatetime: string;
    custom_field1: any;
    _image: Array<{
      _id: string;
      _preurl: string;
      _url: string;
    }>;
  }
}
