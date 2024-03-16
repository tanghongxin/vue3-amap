declare namespace AMap {
  /**
   * @description plugins - 构造一个距离量测插件对象
   * https://lbs.amap.com/api/jsapi-v2/documentation#rangingtool
   */
  export class RangingTool {
    constructor(map: AMap.Map, opts?: RangingToolOptions);

    /**
     * 启动测距工具
     */
    turnOn(): void;

    /**
     * 关闭测距工具
     */
    turnOff(removeOverlays: boolean): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface RangingToolOptions {
    startMarkerOptions?: AMap.MarkerOptions;
    midMarkerOptions?: AMap.MarkerOptions;
    endMarkerOptions?: AMap.MarkerOptions;
    lineOptions?: AMap.PolylineOptions;
    tmpLineOptions?: AMap.PolylineOptions;
    startLabelText?: string;
    midLabelText?: string;
    endLabelText?: string;
    startLabelOffset?: AMap.Pixel;
    midLabelOffset?: AMap.Pixel;
    endLabelOffset?: AMap.Pixel;
  }
}
