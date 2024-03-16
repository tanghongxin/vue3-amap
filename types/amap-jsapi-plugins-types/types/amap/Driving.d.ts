declare namespace AMap {
  /**
   * @description plugins - 驾车路线规划服务，提供起、终点坐标的驾车导航路线查询功能
   * https://lbs.amap.com/api/jsapi-v2/documentation#driving
   */
  export class Driving {
    constructor(opts: DrivingOptions);

    /**
     * 根据起点、终点和途经点（可选）坐标或名称，实现驾车路线规划，途经点通过opts设定
     * @param origin
     * @param destination
     * @param opts
     * @param callback
     */
    search(
      origin: AMap.LngLat,
      destination: AMap.LngLat,
      opts: { waypoints: Array<AMap.LngLat> },
      callback: DrivingCallback
    ): void;

    /**
     * 根据起点、终点和途经点（可选）坐标或名称，实现驾车路线规划，途经点通过points设定
     * @param points
     * @param callback
     */
    search(points: Array<object>, callback: DrivingCallback): void;

    /**
     * 清除搜索结果
     */
    clear(): void;

    /**
     * 设置避让区域，最大支持三个避让区域
     * @param areas 参数为LngLat的二维数组
     */
    setAvoidPolygons(areas: Array<Array<AMap.LngLatLike>>): void;

    /**
     * 清除避让区域
     */
    clearAvoidPolygons(): void;

    /**
     * 获取避让区域，返回LngLat的二维数组
     */
    getAvoidPolygons(): Array<Array<AMap.LngLat>>;

    /**
     * 设置避让道路名称，只支持一条避让道路 注：避让道路和避让区域不能同时使用
     */
    setAvoidRoad(value: string): void;

    /**
     * 清除避让道路
     */
    clearAvoidRoad(): void;

    /**
     * 获取避让道路
     */
    getAvoidRoad(): string;

    /**
     * 设置车牌的汉字首字符和首字后的号码，设置后路线规划的结果将考虑该车牌在当前时间的限行路段
     * @param province
     * @param number
     */
    setProvinceAndNumber(province: string, number: string): void;

    /**
     * 设置驾车路线规划策略
     * @param policy
     */
    setPolicy(policy: object): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface DrivingOptions {
    map?: AMap.Map;
    policy?: number;
    extensions?: 'base' | 'all';
    ferry?: 0 | 1;
    panel?: string | HTMLElement;
    hideMarkers?: boolean;
    showTraffic?: boolean;
    province?: string;
    number?: string;
    isOutline?: boolean;
    outlineColor?: string;
  }

  export interface DrivingCallback {
    status: 'complete' | 'error' | 'no_data';
    result: DrivingResult | string | 0;
  }

  export interface DrivingResult {
    info: string;
    origin: AMap.LngLat;
    destination: AMap.LngLat;
    start: any;
    end: any;
    waypoints: any;
    taxi_cost: number;
    routes: Array<DriveRoute>;
  }

  interface DriveRoute {
    distance: number;
    time: number;
    policy: string;
    tolls: number;
    tolls_distance: number;
    steps: Array<DriveStep>;
    restriction: number;
  }

  interface DriveStep {
    start_location: AMap.LngLat;
    end_location: AMap.LngLat;
    instruction: string;
    action: string;
    assist_action: string;
    orientation: string;
    road: string;
    distance: number;
    tolls: number;
    tolls_distance: number;
    toll_road: string;
    time: number;
    path: Array<AMap.LngLat>;
  }
}
