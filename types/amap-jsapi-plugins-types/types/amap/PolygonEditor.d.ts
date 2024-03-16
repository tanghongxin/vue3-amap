declare namespace AMap {
  /**
   * @description plugins - 多边形覆盖物
   * https://lbs.amap.com/api/jsapi-v2/documentation#polygoneditor
   */
  export class PolygonEditor {
    constructor(
      map: AMap.Map,
      polygon?: AMap.Polygon,
      opts?: { createOptions: object; editOptions: object; controlPoint: object; midControlPoint: object },
    );

    /**
     * 开始编辑对象
     */
    open(): void;

    /**
     * 设置编辑对象
     * @param tar
     * @param overlay
     */
    setTarget(tar: any, overlay: AMap.Polygon): void;

    /**
     * 获取编辑对象
     */
    getTarget(): AMap.Polygon | undefined;

    /**
     * 设置吸附多边形
     * @param list
     */
    setAdsorbPolygons(list: AMap.Polygon | Array<AMap.Polygon>): void;

    /**
     * 清空所有的吸附多边形
     */
    clearAdsorbPolygons(): void;

    /**
     * 删除吸附多边形
     * @param list
     */
    removeAdsorbPolygons(list: AMap.Polygon | Array<AMap.Polygon>): void;

    /**
     * 停止编辑对象
     */
    close(): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }
}
