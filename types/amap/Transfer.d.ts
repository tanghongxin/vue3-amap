declare namespace AMap {
  /**
   * @description plugins - 公交换乘服务，提供起始点公交路线规划服务，目前公交换乘仅支持同一城市的公交路线规划，跨城市出行规划请参考驾车导航查询
   * https://lbs.amap.com/api/jsapi-v2/documentation#transfer
   */
  export class Transfer {
    constructor(opts: TransferOptions);

    /**
     * 根据起点和终点坐标，进行公交换乘查询
     * @param origin
     * @param destination
     * @param callback
     */
    search(origin: AMap.LngLat, destination: AMap.LngLat, callback: TransferCallback): void;

    /**
     * 根据起点和终点坐标，进行公交换乘查询
     * @param points
     * @param callback
     */
    search(points: Array<object>, callback: TransferCallback): void;

    /**
     * 设置公交路径规划出发时间
     * @param time
     * @param date
     */
    leaveAt(time: string, date: string): void;

    /**
     * 清除结果显示
     */
    clear(): void;

    /**
     * 设置公交换乘策略
     * @param policy
     */
    setPolicy(policy: AMap.TransferPolicy): void;

    /**
     * 设置公交换乘查询的城市
     * @param city
     */
    setCity(city: string): void;

    /**
     * 设置公交换乘查询的目的地城市
     * @param cityd
     */
    setCityd(cityd: string): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface TransferOptions {
    map?: AMap.Map;
    city?: string;
    policy?: number;
    nightflag?: boolean;
    extensions?: 'base' | 'all';
    panel?: string | HTMLElement;
    hideMarkers?: boolean;
    isOutline?: boolean;
    outlineColor?: string;
    autoFitView?: boolean;
  }

  export enum TransferPolicy {
    LEAST_TIME,
    LEAST_FEE,
    LEAST_TRANSFER,
    LEAST_WALK,
    MOST_COMFORT,
    NO_SUBWAY,
  }

  export interface TransferCallback {
    status: 'complete' | 'error' | 'no_data';
    result: TransferResult | string | 0;
  }

  export interface TransferResult {
    info: string;
    origin: AMap.LngLat;
    destination: AMap.LngLat;
    start: any;
    end: any;
    taxi_cost: number;
    plans: Array<TransferPlan>;
  }

  interface TransferPlan {
    cost: number;
    time: number;
    distance: number;
    nightLine: boolean;
    walking_distance: number;
    transit_distance: number;
    railway_distance: number;
    taxi_distance: number;
    path: Array<AMap.LngLat>;
    segments: Array<Segment>;
  }

  interface Segment {
    instruction: string;
    transit_mode: string;
    time: number;
    transit: TransitDetails | WalkDetails;
    distance: number;
  }

  interface TransitDetails {
    on_station: Stop;
    off_station: Stop;
    lines: Array<TransitLine>;
    via_num: number;
    via_stops: Array<Stop>;
    path: Array<AMap.LngLat>;
    entrance: SubwayEntrance;
    exit: SubwayEntrance;
  }

  interface TransitLine {
    name: string;
    id: string;
    type: string;
    stime: string;
    etime: string;
  }

  interface SubwayEntrance {
    name: string;
    location: LngLat;
  }

  interface Stop {
    name: string;
    id: string;
    location: LngLat;
  }
}
