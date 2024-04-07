declare namespace AMap {
  /**
   * @description plugins - 灵活点标记
   * https://lbs.amap.com/api/jsapi-v2/documentation#elasticmarker
   */
  export class ElasticMarker {
    constructor(options: ElasticMarkerOptions);

    /**
     * 获取获取灵活点标记标记的文字提示
     */
    getTitle(): string | undefined;

    /**
     * 设置鼠标滑过灵活点标记时的文字提示
     * @param title
     */
    setTitle(title: string): void;

    /**
     * 获取灵活点标记是否支持鼠标单击事件
     */
    getClickable(): boolean;

    /**
     * 设置灵活点标记是否支持鼠标单击事件
     * @param clickable
     */
    setClickable(clickable: boolean): void;

    /**
     * 获取灵活点标记对象是否可拖拽移动
     */
    getDraggable(): boolean;

    /**
     * 获取覆盖物的地图实例
     */
    getMap(): AMap.Map | null;

    /**
     * 将覆盖物设置到地图上
     */
    setMap(map: AMap.Map): void;

    /**
     * 显示覆盖物
     */
    show(): void;

    /**
     * 隐藏覆盖物
     */
    hide(): void;

    /**
     * 获取覆盖物位置
     */
    getPosition(): any;

    /**
     * 设置灵活点标记位置
     * @param position
     */
    setPosition(position: AMap.Vector): any;

    /**
     * 设置灵活点标记锚点
     * @param anchor
     */
    setAnchor(anchor: string): any;

    /**
     * 获取覆盖物的叠加顺序
     */
    getzIndex(): number | undefined;

    /**
     * 设置覆盖物的叠加顺序
     * @param zIndex
     */
    setzIndex(zIndex: number): void;

    /**
     * 获取覆盖物的所有属性
     */
    getOptions(): AMap.OverlayOptions;

    /**
     * 获取地物对象的经纬度矩形范围
     */
    getBounds(): AMap.Bounds;

    /**
     * 设置灵活点标记对象是否可拖拽移动
     * @param draggable
     */
    setDraggable(draggable: boolean): void;

    /**
     * 获取该灵活点标记是否置顶
     */
    getTop(): boolean;

    /**
     * 地图上有多个marker时，设置是否置顶该灵活点标记
     * @param isTop
     */
    setTop(isTop: boolean): void;

    /**
     * 获取鼠标悬停时的光标设置
     */
    getCursor(): string;

    /**
     * 设置鼠标悬停时的光标
     * @param cursor
     */
    setCursor(cursor: string): void;

    /**
     * 获取用户自定义数据
     */
    getExtData(): any | undefined;

    /**
     * 设置用户自定义数据
     * @param extData
     */
    setExtData(extData: any): void;

    /**
     * 移除点标记
     */
    remove(): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  /**
   * 灵活点标记参数
   */
  export interface ElasticMarkerOptions {
    map: AMap.Map;
    position?: AMap.Vector | AMap.LngLat;
    visible?: boolean;
    zIndex?: number;
    offset?: AMap.Vector | AMap.Pixel;
    clickable?: boolean;
    draggable?: boolean;
    bubble?: boolean;
    cursor?: string;
    topWhenClick?: boolean;
    zoomStyleMapping?: Record<string, number>;
    extData?: any;
    styles?: Array<ElasticStyle>;
  }

  /**
   * 多个不同样式的数组
   */
  export interface ElasticStyle {
    icon?: ElasticIcon;
    label?: ElasticLabel;
  }

  /**
   * 灵活标注图标样式类型
   */
  export interface ElasticIcon {
    img?: string;
    size?: AMap.Vector;
    anchor?: AMap.Vector | string;
    imageOffset?: AMap.Vector | string;
    imageSize?: number;
    fitZoom?: number;
    scaleFactor?: number;
    maxScale?: number;
    minScale?: number;
  }

  /**
   * 灵活标注文本样式类型
   */
  export interface ElasticLabel {
    content?: string;
    position?: string;
    offset?: string;
    minZoom?: number;
  }
}
