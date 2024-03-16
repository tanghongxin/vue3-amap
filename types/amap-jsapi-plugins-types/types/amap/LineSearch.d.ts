declare namespace AMap {
  /**
   * @description plugins - 公交路线查询类
   * https://lbs.amap.com/api/jsapi-v2/documentation#linesearch
   */
  export class LineSearch {
    constructor(opts: LineSearchOptions, extensions?: string);

    /**
     * 设置查询结果页码
     * @param pageIndex 默认值：1 取值范围：1-100，超过取值范围按默认
     */
    setPageIndex(pageIndex?: number): void;

    /**
     * 设置单页显示结果条数
     * @param pageSize 默认值：20 取值范围：1-100，超过取值范围按默认
     */
    setPageSize(pageSize?: number): void;

    /**
     * 设置查询城市
     * @param city 默认值：“全国” 可选值：cityname（中文或中文全拼）、citycode、adcode
     */
    setCity(city?: string): void;

    /**
     * 根据给定的公交站点id进行公交站点详情检索
     * @param id id是公交站点的唯一标识
     * @param callback
     */
    searchById(id: string, callback: LineSearchCallback): void;

    /**
     * 根据给定公交站点名称进行公交站点详情查询
     * @param keyword id是公交站点的唯一标识
     * @param callback
     */
    search(keyword: string, callback: LineSearchCallback): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface LineSearchOptions {
    pageIndex?: number;
    pageSize?: number;
    city?: string;
  }

  export interface LineSearchCallback {
    status: 'complete' | 'error' | 'no_data';
    result: LineSearchResult | string | 0;
  }

  export interface LineSearchResult {
    info: string;
    lineInfo: Array<{
      id: string;
      name: string;
      path: AMap.LngLat;
      citycode: string;
      type: string;
      start_stop: string;
      end_stop: string;
    }>;
    keywordList: Array<string>;
    cityList: Array<{
      stime: string;
      etime: string;
      basic_price: string;
      total_price: string;
      via_stops: Array<any>;
      distance: number;
      bounds: AMap.Bounds;
      company: string;
    }>;
  }
}
