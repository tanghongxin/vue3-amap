declare namespace AMap {
  /**
   * @description plugins - 地图类型切换插件
   * https://lbs.amap.com/api/jsapi-v2/documentation#maptype
   */
  export class MapType {
    constructor(options?: MapTypeOptions);

    /**
     * 恢复鹰眼控件的正常大小
     */
    addLayer(layerInfo: LayerInfo): void;

    /**
     * 移除一个图层
     */
    removeLayer(id: string): void;

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
     * 显示鹰眼控件
     */
    show(): void;

    /**
     * 隐藏鹰眼控件
     */
    hide(): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface MapTypeOptions {
    position?: AMap.ControlConfig['position']
    defaultType?: number;
    showTraffic?: boolean;
    showRoad?: boolean;
  }

  export interface LayerInfo {
    id: string;
    enable: string;
    name: string;
    type: 'base' | 'overlay';
    layer: AMap.LayerGroup;
    show: boolean;
  }
}
