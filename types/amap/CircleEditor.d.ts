declare namespace AMap {
  /**
   * @description plugins - 圆形覆盖物
   * https://lbs.amap.com/api/jsapi-v2/documentation#circleeditor
   */
  export class CircleEditor {
    constructor(
      map: AMap.Map,
      circle?: AMap.Circle,
      opts?: { createOptions: object; editOptions: object; movePoint: object; resizePoint: object },
    );

    /**
     * 设置编辑对象
     * @param overlay
     */
    setTarget(overlay: AMap.Circle): void;

    /**
     * 获取编辑对象
     */
    getTarget(): AMap.Circle | undefined;

    /**
     * 开始编辑对象
     */
    open(): void;

    /**
     * 停止编辑对象
     */
    close(): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }
}
