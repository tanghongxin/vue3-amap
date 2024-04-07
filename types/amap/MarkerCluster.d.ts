declare namespace AMap {
  /**
   * @description plugins - 聚合
   * https://lbs.amap.com/api/jsapi-v2/documentation#markercluster
   */
  export class MarkerCluster {
    constructor(
      map: AMap.Map,
      dataOptions: MarkerClusterDataOptions,
      markerClusterOptions?: {
        // 聚合计算时网格的像素大小，默认60
        gridSize?: number;

        // 最大的聚合级别，大于该级别就不进行相应的聚合。默认值为 18，即小于 18 级的级别均进行聚合，18 及以上级别不进行聚合
        maxZoom?: number;

        // 聚合点的图标位置是否是所有聚合内点的中心点。默认为 true。数据中如果含有权重值，以权重高的点为中心进行聚合
        averageCenter?: boolean;

        // 地图缩放过程中是否聚合。默认值 false
        clusterByZoomChange?: boolean;

        // 指定聚合后的点标记的图标样式，可缺省，缺省时为默认样式
        styles?: {
          url: string; // 图标显示图片的url地址
          size: AMap.Size; // 图标显示图片的大小
          offset?: AMap.Pixel; // 图标定位在地图上的位置相对于图标左上角的偏移值。默认为(0,0),不偏移
          imageOffset?: AMap.Pixel; // 图片相对于可视区域的偏移值，此功能的作用等同CSS中的background-position属性。默认为(0,0)
          textColor?: string; // 文字的颜色，默认为"#000000"
          textSize?: number; // 文字的大小，默认为10
        };

        // 该方法用来实现聚合点的自定义绘制，由开发者自己实现，API 将在绘制每个聚合点的时候调用这个方法，可以实现聚合点样式的灵活设定，指定了 renderClusterMarker 后 styles 无效
        renderClusterMarker?: ({ count, marker }: { count: number; marker: AMap.Marker }) => void;

        // 该方法用来实现非聚合点的自定义绘制，由开发者自己实现，API 将在绘制每个非聚合点的时候调用这个方法
        renderMarker?: ({ marker }: { marker: AMap.Marker }) => void;
      },
    );

    /**
     * 在原数据基础上添加数据
     * @param dataOptions
     */
    addData(dataOptions: MarkerClusterDataOptions): void;

    /**
     * 设置数据
     * @param dataOptions
     */
    setData(dataOptions: MarkerClusterDataOptions): void;

    /**
     * 获取聚合点的总数量
     */
    getClustersCount(): number;

    /**
     * 获取聚合网格的像素大小
     */
    getGridSize(): number;

    /**
     * 设置聚合网格的像素大小
     * @param size
     */
    setGridSize(size: number): void;

    /**
     * 获取地图中点标记的最大聚合级别
     */
    getMaxZoom(): number;

    /**
     * 设置地图中点标记的最大聚合级别
     * @param zoom
     */
    setMaxZoom(zoom: number): void;

    /**
     * 设置样式聚合点，格式同 opts.styles
     * @param map
     */
    setStyles(map: AMap.Map): void;

    /**
     * 获取样式
     */
    getStyles(): Array<any>;

    /**
     * 获取地图对象
     */
    getMap(): AMap.Map;

    /**
     * 设置地图对象
     * @param map
     */
    setMap(map: AMap.Map): void;

    /**
     * 获取单个聚合点位置是否是聚合内所有标记的平均中心
     */
    isAverageCenter(): boolean;

    /**
     * 设置聚合点位置是否是所有聚合点的中心
     * @param averageCenter
     */
    setAverageCenter(averageCenter: boolean): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export type MarkerClusterDataOptions = Array<{ lnglat: [number, number]; weight?: number }> | null;

  export interface MarkerClusterClickEvent {
    cluster: object;
    clusterData: { lnglat: AMap.LngLat }[];
    target: object;
    lnglat: AMap.LngLat;
    marker: AMap.Marker;
  }
}
