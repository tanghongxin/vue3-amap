declare namespace AMap {
  /**
   * @description plugins - 地图操作工具条插件
   * https://lbs.amap.com/api/jsapi-v2/documentation#toolbar
   */
  export class ToolBar {
    constructor(options: { position?: string | object; offset?: AMap.Vector2 });

    /**
     * 添加控件到地图上
     * @param map
     */
    addTo(map: AMap.Map): void;

    /**
     * 从地图上移除控件
     */
    remove(): void;

    /**
     * 设置控件可见
     */
    show(): void;

    /**
     * 设置控件隐藏
     */
    hide(): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }
}
