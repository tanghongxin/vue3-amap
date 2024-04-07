declare namespace AMap {
  /**
   * @description plugins - 骑行路线规划服务，提供起、终点坐标的驾车导航路线查询功能
   * https://lbs.amap.com/api/jsapi-v2/documentation#riding
   */
  export class Riding {
    constructor(opts: RidingOptions);

    /**
     * 清除搜索的结果
     */
    clear(): void;

    /**
     * 骑行路线规划策略
     * @param policy
     */
    setPolicy(policy: number): void;

    /**
     * 根据起点、终点坐标，实现步行路线规划
     * @param origin
     * @param destination
     * @param callback
     */
    search(origin: AMap.LngLat, destination: AMap.LngLat, callback: RidingCallback): void;

    /**
     * 根据起点、终点名称，实现步行路线规划
     * @param points
     * @param callback
     */
    search(points: Array<object>, callback: RidingCallback): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface RidingOptions {
    map?: AMap.Map;
    policy?: number;
    panel?: string | HTMLElement;
    hideMarkers?: boolean;
    isOutline?: boolean;
    outlineColor?: string;
    autoFitView?: boolean;
  }

  export interface RidingCallback {
    status: 'complete' | 'error' | 'no_data';
    result: RidingResult | string | 0;
  }

  interface RidingResult {
    info: string;
    origin: AMap.LngLat;
    destination: AMap.LngLat;
    start: any;
    end: any;
    count: number;
    routes: Array<RideRoute>;
  }

  interface RideRoute {
    distance: number;
    time: number;
    rides: Array<RideStep>;
  }

  interface RideStep {
    start_location: AMap.LngLat;
    end_location: AMap.LngLat;
    instruction: string;
    distance: number;
    time: number;
    path: Array<AMap.LngLat>;
    action: string;
    assist_action: string;
    orientation: string;
    road: string;
  }
}
