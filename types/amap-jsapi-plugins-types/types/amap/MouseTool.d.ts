declare namespace AMap {
  /**
   * @description plugins - 鼠标工具插件
   * https://lbs.amap.com/api/jsapi-v2/documentation#mousetool
   */
  export class MouseTool {
    constructor(map: AMap.Map);

    /**
     * 开启鼠标画点标注模式。鼠标在地图上单击绘制点标注，标注样式参考MarkerOptions设置
     * @param opts
     */
    marker(opts: AMap.MarkerOptions): void;

    /**
     * 开启鼠标画圆模式。鼠标在地图上拖动绘制相应的圆形。圆形样式参考CircleOptions设置
     * @param opts
     */
    circle(opts: AMap.CircleOptions): void;

    /**
     * 开启鼠标画矩形模式。鼠标在地图上拉框即可绘制相应的矩形。矩形样式参考PolygonOptions设置
     * @param opts
     */
    rectangle(opts: AMap.PolygonOptions): void;

    /**
     * 开启鼠标画折线模式。鼠标在地图上点击绘制折线，鼠标左键双击或右键单击结束绘制，折线样式参考PolylineOptions设置
     * @param opts
     */
    polyline(opts: AMap.PolylineOptions): void;

    /**
     * 开启鼠标画多边形模式。鼠标在地图上单击开始绘制多边形，鼠标左键双击或右键单击结束当前多边形的绘制，多边形样式参考PolygonOptions设置
     * @param opts
     */
    polygon(opts: AMap.PolygonOptions): void;

    /**
     * 开启面积量测模式。鼠标在地图上单击绘制量测区域，鼠标左键双击或右键单击结束当前量测操作，并显示本次量测结果。量测面样式参考PolygonOptions设置
     * @param opts
     */
    measureArea(opts: AMap.PolygonOptions): void;

    /**
     * 开启距离量测模式。鼠标在地图上单击绘制量测节点，并计算显示两两节点之间的距离，鼠标左键双击或右键单击结束当前量测操作。量测线样式参考 PolylineOptions 设置 注：不能同时使用rule方法和RangTool插件进行距离量测
     * @param opts
     */
    rule(opts: AMap.PolylineOptions): void;

    /**
     * 开启鼠标拉框放大模式。鼠标可在地图上拉框放大地图。矩形框样式参考PolygonOptions设置
     * @param opts
     */
    rectZoomIn(opts: AMap.PolygonOptions): void;

    /**
     * 开启鼠标拉框缩小模式。鼠标可在地图上拉框缩小地图。矩形框样式参考PolygonOptions设置
     * @param opts
     */
    rectZoomOut(opts: AMap.PolygonOptions): void;

    /**
     * 关闭当前鼠标操作。参数arg设为true时，鼠标操作关闭的同时清除地图上绘制的所有覆盖物对象；设为false时，保留所绘制的覆盖物对象。默认为false
     * @param { boolean } ifClear 默认false
     */
    close(ifClear?: boolean): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }
}
