declare namespace AMap {
  /**
   * @description plugins - 热力图，基于第三方heatmap.js实现，以特殊高亮的形式显示数据密集程度
   * https://lbs.amap.com/api/jsapi-v2/documentation#heatmap
   */
  export class HeatMap {
    constructor(map: AMap.Map, opts?: HeatMapOptions);

    /**
     * 获取热力图叠加地图对象
     */
    getMap(): AMap.Map;

    /**
     * 设置热力图要叠加的地图实例，也可以在Map中的layers属性中设置为默认显示的图层
     * @param map
     */
    setMap(map: AMap.Map): void;

    /**
     * 获取热力图的属性信息
     */
    getOptions(): HeatMapOptions;

    /**
     * 设置热力图属性，请参考 HeatMapOptions 列表中的说明
     * @param opts
     */
    setOptions(opts: HeatMapOptions): void;

    /**
     * 输出热力图的数据集，数据结构同setDataSet中的数据集
     */
    getDataSet(): object;

    /**
     * 设置热力图展现的数据集
     * @param dataset
     */
    setDataSet(dataset): void;

    /**
     * 向热力图数据集中添加坐标点
     * @param longitude
     * @param latitude
     * @param count
     */
    addDataPoint(longitude: string, latitude: string, count?: number): void;

    /**
     * 获得热力图层叠加层级
     */
    getzIndex(): number;

    /**
     * 设置热力图层叠加层级
     * @param zIndex
     */
    setzIndex(zIndex: number): void;

    /**
     * 显示热力图
     */
    show(): void;

    /**
     * 隐藏热力图
     */
    hide(): void;
  }

  export interface HeatMapOptions {
    radius?: number;
    gradient?: object;
    opacity?: AMap.Vector2;
    zooms?: AMap.Vector2;
    visible?: boolean;
    zIndex?: number;
    '3d'?: HeatMap3DOptions;
  }

  interface HeatMap3DOptions {
    heightScale?: number;
    heightBezier?: Array<number>;
    gridSize?: number;
  }
}
