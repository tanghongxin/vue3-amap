declare namespace AMap {
  /**
   * @description plugins - 折线编辑插件，用于编辑AMap.Polyline对象，支持通过鼠标调整折线的形状。
   * https://lbs.amap.com/api/jsapi-v2/documentation#polylineeditor
   */
  export class PolylineEditor {
    constructor(map: AMap.Map, polygon?: AMap.Polygon, opts?: PolylineEditorOptions);

    /**
     * 设置编辑对象
     * @param overlay
     */
    setTarget(overlay?: AMap.Polyline): void;

    /**
     * 获取编辑对象
     */
    getTarget(): AMap.Polyline;

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

  export interface PolylineEditorOptions {
    createOptions?: object;
    editOptions?: object;
    controlPoint?: object;
    midControlPoint?: object;
  }
}
