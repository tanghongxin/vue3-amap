declare namespace AMap {
  /**
   * @description plugins - 比例尺插件
   * https://lbs.amap.com/api/jsapi-v2/documentation#scale
   */
  export class HawkEye {
    constructor(options?: HawkEyeOptions);

    /**
     * 恢复鹰眼控件的正常大小
     */
    open(): void;

    /**
     * 最小化鹰眼控件
     */
    close(): void;

    /**
     * 显示鹰眼控件
     */
    show(): void;

    /**
     * 隐藏鹰眼控件
     */
    hide(): void;
  }

  export interface HawkEyeOptions {
    autoMove?: boolean;
    showRectangle?: boolean;
    showButton?: boolean;
    isOpen?: boolean;
    mapStyle?: string;
    layers?: Array<AMap.LayerGroup>;
    width?: string;
    height?: string;
    offset?: AMap.Vector2;
    borderStyle?: string;
    borderColor?: string;
    borderRadius?: string;
    borderWidth?: string;
    buttonSize?: string;
  }
}
