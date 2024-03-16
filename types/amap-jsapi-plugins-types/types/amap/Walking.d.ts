declare namespace AMap {
  /**
   * @description plugins - 步行路线规划服务，提供起、终点坐标的驾车导航路线查询功能
   * https://lbs.amap.com/api/jsapi-v2/documentation#walking
   */
  export class Walking {
    constructor(opts: WalkingOptions);

    /**
     * 清除搜索的结果
     */
    clear(): void;

    /**
     * 根据起点、终点坐标，实现步行路线规划
     * @param origin
     * @param destination
     * @param callback
     */
    search(origin: AMap.LngLat, destination: AMap.LngLat, callback: WalkingCallback): void;

    /**
     * 根据起点、终点名称，实现步行路线规划
     * @param points
     * @param callback
     */
    search(points: Array<object>, callback: WalkingCallback): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface WalkingOptions {
    map?: AMap.Map;
    panel?: string | HTMLElement;
    hideMarkers?: boolean;
    isOutline?: boolean;
    outlineColor?: string;
    autoFitView?: boolean;
  }

  export interface WalkingCallback {
    status: 'complete' | 'error' | 'no_data';
    result: WalkingResult | string | 0;
  }

  interface WalkingResult {
    info: string;
    origin: AMap.LngLat;
    destination: AMap.LngLat;
    start: any;
    end: any;
    count: number;
    routes: Array<WalkRoute>;
  }

  interface WalkDetails {
    origin: AMap.LngLat;
    destination: AMap.LngLat;
    steps: Array<WalkStep>;
    path: Array<AMap.LngLat>;
  }

  interface WalkStep {
    instruction: string;
    distance: number;
    time: number;
    path: Array<AMap.LngLat>;
    road: string;
    action: string;
    assist_action: string;
  }

  interface WalkRoute {
    distance: number;
    time: number;
    steps: Array<WalkStep>;
  }
}
