declare namespace AMap {
  /**
   * @description plugins - 驾车路线规划服务，提供起、终点坐标的驾车导航路线查询功能
   * https://lbs.amap.com/api/jsapi-v2/documentation#truckdriving
   */
  export class TruckDriving {
    constructor(opts: TruckDrivingOptions);

    /**
     * 清除搜索结果
     */
    clear(): void;

    /**
     * 根据起点、终点和途经点（可选）坐标或名称，实现驾车路线规划
     * @param locations
     * @param callback
     */
    search(locations: Array<{ Location: Location }>, callback: AMap.DrivingCallback): void;

    /**
     * 根据起点、终点和途经点（可选）坐标或名称，实现驾车路线规划
     * @param points
     * @param callback
     */
    search(points: Array<{ point: SearchPoint }>, callback: AMap.DrivingCallback): void;

    /**
     * 修改车牌号
     * @param province
     * @param number
     */
    setProvinceAndNumber(province: string, number: number): void;

    /**
     * 设置驾车路线规划策略,参考opts.policy
     * @param policy
     */
    setPolicy(policy: object): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface TruckDrivingOptions {
    map?: AMap.Map;
    policy?: number;
    size?: number;
    width?: number;
    height?: number;
    load?: number;
    weight?: number;
    axlesNum?: number;
    extensions?: 'base' | 'all';
    ferry?: 0 | 1;
    panel?: string | HTMLElement;
    hideMarkers?: boolean;
    showTraffic?: boolean;
    province?: string;
    number?: string;
    isOutline?: boolean;
    outlineColor?: string;
    autoFitView?: boolean;
  }

  interface SearchLocation {
    lnglat: AMap.Vector2;
    pid: string;
    type: string;
  }

  interface SearchPoint {
    keyworkd: string;
    city: string;
  }
}
