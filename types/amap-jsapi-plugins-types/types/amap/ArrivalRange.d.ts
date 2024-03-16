declare namespace AMap {
  /**
   * @description plugins - AMap.ArrivalRange根据输入的起点坐标和设定的时间范围，可以计算出用户在你设定的时间段内按公交出行方式，可以到达的距离范围。
   * 无v2版本文档，暂从1.x文档获取：https://lbs.amap.com/api/javascript-api/reference/route-search#m_AMap.ArrivalRange
   */
  export class ArrivalRange {
    constructor(opts: ArrivalRangeOptions);

    /**
     * 计算某个时间段内用户通过公交出行可到达的距离范围
     * @param origin
     * @param time
     * @param callback
     * @param opts
     */
    search(origin: AMap.LngLat, time: Number, callback: ArrivalRangeCallback, opts: ArrivalRangeOptions): void;
  }

  export interface ArrivalRangeOptions {
    policy?: string;
    resultType?: string;
    destination?: AMap.LngLat | Array<AMap.LngLat>;
  }

  export interface ArrivalRangeCallback {
    status: 'complete' | 'error' | 'no_data';
    result: ArrivalRangeResult | string | 0;
  }

  interface ArrivalRangeResult {
    info: string;
    bounds: Array<AMap.Bounds>;
    inRange: boolean;
  }
}
