declare namespace AMap {
  /**
   * @description plugins - 拖拽导航插件。通过鼠标拖拽已有导航路径上的任一点，可以实现导航起点、途经点、终点的调整，系统根据调整后的起点、途经点、终点信息，实时查询拖拽后的导航路径并在地图上同步显示
   * https://lbs.amap.com/api/jsapi-v2/documentation#dragroute
   */
  export class DragRoute {
    constructor(map: AMap.Map, path: Array<AMap.LngLat>, policy: string, opts?: DragRouteOptions);

    /**
     * 开始路径导航。支持鼠标拖拽导航路径节点，更改途经点时，系统实时重新计算并显示导航路径
     */
    search(): void;

    /**
     * 返回除了起点和终点之外的所有点返回导航的所有途经点，即所有途径点的坐标数组
     */
    getWays(): Array<AMap.LngLat>;

    /**
     * 返回当前导航路径，即导航路径的经纬度坐标数组
     */
    getRoute(): Array<AMap.LngLat>;

    /**
     * 销毁拖拽导航插件
     */
    destroy(): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface DragRouteOptions {
    polyOption?: AMap.PolylineOptions;
    startMarkerOptions?: AMap.MarkerOptions;
    midMarkerOptions?: AMap.MarkerOptions;
    endMarkerOptions?: AMap.MarkerOptions;
    showTraffic?: boolean;
  }
}
