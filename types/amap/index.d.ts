declare global {
  namespace AMap {
    /**
     * @public
     * @private
     */
    const addCss: (newStyle: string) => void;

    /**
     * @public
     */
    export interface Area {
      visible: boolean;
      rejectTexture: boolean;
      color1: string;
      color2: string;
      path: any[];
    }

    /**
     * @public
     */
    interface BaseLayer {
      hide(): void;
      show(zIndex: number): void;
      add(vectors: VectorOverlay | VectorOverlay[]): void;
      remove(vectors: VectorOverlay | VectorOverlay[]): void;
      has(vector: any): boolean;
      clear(): void;
      setOptions(opts: any): void;
    }

    /**
     * 贝塞尔曲线
     * @public
     * @export
     * @class BezierCurve
     * @implements {Event}
     * @param {BezierCurveOptions} opts BezierCurve配置项
     * @param {Array} opts.path  贝瑟尔曲线的路径。描述为一个二维数组规则如下：第一个元素是起点，
     * 之后的元素同时描述控制点和途经点，之后每个元素可以有0个到2个控制点
     * 控制点在前，途经点在最后
     * [
     *   [lng,lat],//起点0
     *   [lng,lat,lng,lat,lng,lat],//控制点、控制点、途经点2
     *   [lng,lat,lng,lat]//控制点、途经点3
     * ]
     * 或者
     * [
     *   [ [lng,lat] ],//起点0
     *   [ [lng,lat] , [lng,lat] ],//控制点、途经点1
     *   [ [lng,lat] , [lng,lat] , [lng,lat]],//控制点、控制点、途经点2
     *   [ [lng,lat] , [lng,lat] ]//控制点、途经点3
     * ]
     * @param {Array<LngLat>|Array<Array<LngLat>>} opts.path  polyline 路径，支持 lineString 和 MultiLineString
     * @param {number} [opts.zIndex=10]  多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
     * @param {boolean}  [opts.bubble = false] 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）
     * @param {string} [opts.cursor] 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
     * @param {string } [opts.strokeColor = #00D3FC] 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
     * @param {number} [opts.strokeOpacity = 0.5]  轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.5
     * @param {number} [opts.strokeWeight = 2]  轮廓线宽度
     * @param {number} [opts.borderWeight = 2]	描边线宽度
     * @param {boolean} [opts.isOutline=false]  是否显示描边,默认false
     * @param {number} [opts.borderWeight = 1]	描边的宽度，默认为1
     * @param {string} [opts.outlineColor=#00B2D5] 线条描边颜色，此项仅在isOutline为true时有效，默认：#00B2D5
     * @param {boolean} [opts.draggable=false] 设置多边形是否可拖拽移动，默认为false
     * @param {object} [opts.extData]  用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
     * @param {'solid'|'dashed'} [opts.strokeStyle = solid]  轮廓线样式，实线:solid，虚线:dashed
     * @param {number[]}  [opts.strokeDasharray] 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值：
     * 实线：[0,0,0]
     * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
     * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
     * @param {'miter'|'round'|'bevel'} [opts.lineJoin = miter] 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
     * @param {'butt'|'round'|'square'} [opts.lineCap = butt] 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
     * @param {boolean} [opts.geodesic=false] 是否绘制成大地线，默认false
     * @param {boolean} [opts.showDir=false] 是否延路径显示白色方向箭头,默认false。建议折线宽度大于6时使用
     */
    export class BezierCurve extends CombinePolyline<Required<BezierCurveOptions>> {
      _prevZoom: number;

      readonly className: OverlayType;

      constructor(opts?: BezierCurveOptions);

      _handleZoomChange: () => void;

      /**
       * 修改折线属性（包括路径的节点、线样式、是否绘制大地线等。属性详情参看 BezierCurveOptions 列表）
       * @name setOptions
       * @function
       * @param {BezierCurveOptions} optsArg
       * @memberof BezierCurve
       * @instance
       */
      setOptions(optsArg: Partial<BezierCurveOptions>): void;

      /**
       * 获取贝塞尔曲线路径的节点数组
       * @name getPath
       * @function
       * @returns {Array<Array<number>>|Array<Array<Array<number>>>}
       * @memberof BezierCurve
       * @instance
       */
      getPath(): number[][] | number[][][] | undefined;

      /**
       * 设置组成该折线的节点数组
       * @name setPath
       * @function
       * @param {Array<Array<number>>| Array<Array<Array<number>>>} path  - 贝瑟尔曲线的路径。描述为一个二维数组规则如下：第一个元素是起点，
       * 之后的元素同时描述控制点和途经点，之后每个元素可以有0个到2个控制点
       * 控制点在前，途经点在最后
       * [
       *   [lng,lat],//起点0
       *   [lng,lat,lng,lat,lng,lat],//控制点、控制点、途经点2
       *   [lng,lat,lng,lat]//控制点、途经点3
       * ]
       * 或者
       * [
       *   [ [lng,lat] ],//起点0
       *   [ [lng,lat] , [lng,lat] ],//控制点、途经点1
       *   [ [lng,lat] , [lng,lat] , [lng,lat]],//控制点、控制点、途经点2
       *   [ [lng,lat] , [lng,lat] ]//控制点、途经点3
       * ]
       * @memberof BezierCurve
       * @instance
       */
      setPath(path?: number[][] | number[][][]): void;

      /**
       * 获取当前折线的矩形范围对象
       * @name getBounds
       * @function
       * @returns {(Bounds | undefined)}
       * @memberof BezierCurve
       * @instance
       */
      getBounds(): Bounds | undefined;

      contains(originPoint: LngLatLike): boolean;
    }

    /**
     * @public
     */
    export type BezierCurveOptions = LineSharedOptions & {
      path?: number[][] | number[][][];
    };

    /**
     * 地物对象的经纬度矩形范围。
     *
     * @public
     * @export
     * @class Bounds
     * @param {LngLat} southWest 西南角经纬度
     * @param {LngLat} northEast 东北角经纬度值
     */
    export class Bounds {
      static from(bounds: Bounds[]): Bounds;

      static fromPolyline(originPath?: LngLatLike[]): Bounds | undefined;

      static fromMultiPolyline(originPath?: LngLatLike[][]): Bounds | undefined;

      static fromPolygon(originPath?: LngLatLike[] | LngLatLike[][]): Bounds | undefined;

      static fromMultiPolygon(originPath?: LngLatLike[][][]): Bounds | undefined;

      southWest: LngLat;

      northEast: LngLat;

      className: string;

      constructor(...args: any[]);

      /**
       * 获取西南角坐标。
       * @name getSouthWest
       * @function
       * @return {LngLat}
       * @memberof Bounds
       * @instance
       */
      getSouthWest(): LngLat;

      /**
       * 获取东北角坐标
       * @name getNorthEast
       * @function
       * @return {LngLat}
       * @memberof Bounds
       * @instance
       */
      getNorthEast(): LngLat;

      /**
       * 获取西北角坐标
       * @name getNorthEast
       * @function
       * @return {LngLat}
       * @memberof Bounds
       * @instance
       */
      getNorthWest(): LngLat;

      /**
       * 获取东南角坐标
       * @name getNorthEast
       * @function
       * @return {LngLat}
       * @memberof Bounds
       * @instance
       */
      getSouthEast(): LngLat;

      /**
       * 指定点坐标是否在矩形范围内
       * [相关示例](https://lbs.amap.com/api/javascript-api/example/relationship-judgment/point-surface-relation)
       * @example bounds.contains(new AMap.LngLat(116,39));
       *
       * @name contains
       * @function
       * @param {LngLat} obj
       * @return {Boolean}
       * @memberof Bounds
       * @instance
       */
      contains(center: LngLatLike): boolean;

      /**
       * 获取当前Bounds的中心点经纬度坐标。
       * @name getCenter
       * @function
       * @return {LngLat}
       * @memberof Bounds
       * @instance
       */
      getCenter(): LngLat;

      /**
       * 以字符串形式返回地图对象的矩形范围
       * @name toString
       * @function
       * @return {String}
       * @memberof Bounds
       * @instance
       */
      toString(): string;

      toJSON(): number[];

      getWidth(): number;

      getHeight(): number;
    }

    /**
     * @public
     * @constant
     * @property {string }us 当前浏览器userAgent
     * @property {boolean}	mobile	是否移动设备
     * @property {string} plat 平台类型，如：'windows'、'mac'、'ios'、'android'、'other'
     * @property  {boolean} windows	是否windows设备
     * @property {boolean} ios 	是否iOS设备
     * @property {boolean} iPad		是否iPad
     * @property {boolean} Phone		是否iPhone
     * @property {boolean} android		是否安卓设备
     * @property {boolean} android23		是否安卓4以下系统
     * @property {boolean} chrome		是否Chrome浏览器
     * @property {boolean} firefox		是否火狐浏览器
     * @property {boolean} safari		是否Safari浏览器
     * @property {boolean} wechat		是否微信
     * @property {boolean} uc		是否UC浏览器
     * @property {boolean} qq		是否QQ或者QQ浏览器
     * @property {boolean} ie		是否IE
     * @property {boolean} ie6		是否IE6
     * @property {boolean} ie7		是否IE7
     * @property {boolean} ie8		是否IE8
     * @property {boolean} ie9		是否IE9
     * @property {boolean} ie10		是否IE10
     * @property {boolean} ie11		是否IE11
     * @property {boolean} ielt9		是否IE9以下
     * @property {boolean} edge		是否Edge浏览器
     * @property {boolean} isLocalStorage		是否支持LocaStorage
     * @property {boolean} isGeolocation		是否支持Geolocation
     * @property {boolean} mobileWebkit		是否Webkit移动浏览器
     * @property {boolean} mobileWebkit3d		是否支持Css3D的Webkit移动端浏览器
     * @property {boolean} retina		是否高清屏幕，devicePixelRatio>1
     * @property {boolean} touch		是否触屏
     * @property {boolean} msPointer		是否msPointer设备
     * @property {boolean} pointer		是否pointer设备
     * @property {boolean} webkit		是否webkit浏览器
     * @property {boolean} webkit3d		是否支持Css3D的Webkit浏览器
     * @property {boolean} gecko3d		是否支持Css3D的gecko浏览器
     * @property {boolean} ie3d		是否支持Css3D的ie浏览器
     * @property {boolean} any3d		是否支持Css3D的浏览器
     * @property {boolean} opera3d		是否支持Css3D的opera浏览器
     * @property {boolean} isCanvas		是否支持canvas
     * @property {boolean} isSvg		是否支持svg
     * @property {boolean} isVML		是否支持vml
     * @property {boolean} isWorker		是否支持WebWorker
     * @property {boolean} isWebsocket		是否支持WebSocket
     * @property {boolean} isWebGL	是否支持webgl
     */
    export const Browser: {
      ua: string;
      mobile: boolean;
      plat: string;
      mac: boolean;
      windows: boolean;
      ios: boolean;
      iPad: boolean;
      iPhone: boolean;
      android: boolean;
      android23: boolean;
      chrome: boolean;
      firefox: boolean;
      safari: boolean;
      wechat: boolean;
      uc: boolean;
      qq: boolean;
      ie: boolean;
      ie6: boolean;
      ie7: boolean;
      ie8: boolean;
      ie9: boolean;
      ie10: boolean;
      ie11: boolean;
      edge: boolean;
      ielt9: boolean;
      baidu: boolean;
      isLocalStorage: boolean;
      isGeolocation: boolean;
      mobileWebkit: boolean;
      mobileWebkit3d: boolean;
      mobileOpera: boolean;
      retina: boolean;
      touch: boolean;
      msPointer: boolean;
      pointer: boolean;
      baseRender: string;
      wasm: boolean;
      webkit: boolean;
      ie3d: boolean;
      webkit3d: boolean;
      gecko3d: boolean;
      opera3d: boolean;
      any3d: boolean;
      isCanvas: boolean;
      isSvg: boolean;
      isVML: boolean;
      isWorker: boolean;
      isWebsocket: boolean;
      isWebGL: boolean;
    };

    /**
     * 建筑楼块 3D 图层 </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/personalized-map/building-style/)
     * @public
     * @param {BuildingLayerOpts} opts
     * @param {String[]|String} opts.wallColor 楼块侧面颜色，支持 rgba、rgb、十六进制等
     * @param {String[]|String} opts.roofColor 楼块顶面颜色，支持 rgba、rgb、十六进制等
     * @param {Number} opts.heightFactor 楼块的高度系数因子，默认为 1，也就是正常高度
     * @param {BuildingStyleOptions} opts.styleOpts 楼块的围栏和样式设置
     * @param {[Number,Number]} [opts.zooms=[2,20]] 图层缩放等级范围，默认 [2, 20]
     * @param {Number} [opts.opacity=1] 图层透明度，默认为 1
     * @param {Boolean} [opts.visible=true] 图层是否可见，默认为 true
     * @param {Number} [opts.zIndex=11] 图层的层级，默认为 11
     *
     * @export
     * @public
     * @class BuildingLayer
     * @name Buildings
     * @extends Layer
     * @example
     * var buildingLayer = new AMap.Buildings({
     *     heightFactor: 1,
     *     wallColor: [255, 0, 0, 1],
     *     roofColor: 'rgba(0,0,255,0.5)',
     * });
     * map.addLayer(buildingLayer);
     */
    export class BuildingLayer extends BuildingLayer_2 {
      constructor(opts?: Partial<BuildingLayerOpts> | any);

      /**
       * 设置楼块图层样式 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/personalized-map/building-style/)
       *
       * @name setStyle
       * @function
       * @instance
       * @param {BuildingStyleOptions} styleOpts 样式
       * @param {Boolean} styleOpts.hideWithoutStyle 是否隐藏围栏之外的楼块
       * @param {Area[]} styleOpts.areas 围栏信息数组
       * @param {Boolean} styleOpts.areas.rejectTexture 是否隐藏围栏之外的楼块
       * @param {Boolean} styleOpts.areas.visible 围栏信息数组
       * @param {Number[]} styleOpts.areas.path 围栏经纬度列表
       * @param {String[]|String} styleOpts.areas.color1 围栏区域内楼块顶面颜色，支持 rgba、rgb、十六进制等
       * @param {String[]|String} styleOpts.areas.color2 围栏区域内楼块侧面颜色，支持 rgba、rgb、十六进制等
       *
       * @memberof Buildings
       * @example
       * var options = {
       *     hideWithoutStyle:false,//是否隐藏设定区域外的楼块
       *     areas:[{ //围栏1
       *           //visible:false,//是否可见
       *           rejectTexture:true,//是否屏蔽自定义地图的纹理
       *           color1: 'ffffff00',//楼顶颜色
       *           color2: 'ffffcc00',//楼面颜色
       *           path: [[116.473606,39.995997],[116.473005,39.995482],[116.474179,39.996516],[116.473606,39.995997]]
       *    }, { //围栏2
       *           color1: 'ff99ff00',
       *           color2: 'ff999900',
       *           path: [[116.474609,39.993478],[116.474489,39.993495],[116.47469,39.99348],[116.474609,39.993478]]
       *   }]
       * };
       * buildingLayer.setStyle(options); //此配色优先级高于自定义mapStyle
       */
      setStyle(styleOpts: BuildingStyleOptions): void;
    }

    /**
     * @public
     */
    class BuildingLayer_2 extends Layer {
      CLASS_NAME: string;

      constructor();
    }

    /**
     * 楼块图层初始化参数
     * @public
     * @export
     * @interface BuildingLayerOpts
     */
    export interface BuildingLayerOpts {
      zooms?: [number, number];
      opacity?: number;
      heightFactor?: number;
      visible?: boolean;
      zIndex?: number;
      wallColor?: number[];
      roofColor?: number[];
      rejectMapMask?: boolean;

      depthTest?: boolean;
    }

    /**
     * 围栏内楼块的参数设置
     *
     * @public
     * @interface BuildingStyleOptions
     */
    export interface BuildingStyleOptions {
      hideWithoutStyle: boolean;
      areas: Area[];
    }

    /**
     * @public
     * @private
     */
    export class BuryPoint {
      static add(...args: any[]): void;
    }

    /**
     * Canvas图层类，用户可以将一个 Canvas 作为图层添加在地图上，Canvas图层会随缩放级别而自适应缩放。 </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/selflayer/canvaslayer)
     * @param {ImageLayerOptions} opts 传入默认参数列表
     * @param {HTMLCanvasElement} opts.canvas Canvas DOM 对象
     * @param {[Number,Number]} [opts.zooms=[2,20]] 图层缩放等级范围，默认 [2, 20]
     * @param {[Number,Number,Number,Number]|Bounds} opts.bounds canvas 的范围大小经纬度, 如果传递数字数组类型: [minlng,minlat,maxlng,maxlat]
     * @param {Number} [opts.opacity=1] 图层透明度，默认为 1
     * @param {Boolean} [opts.visible=true] 图层是否可见，默认为 true
     * @param {Number} [opts.zIndex=6] 图层的层级，默认为 6
     * @export
     * @class CanvasLayer
     * @extends {ImageLayer}
     * @public
     */
    export class CanvasLayer extends CoreImageLayer {
      constructor(opts?: CanvasLayerOptions);

      /**
       * 修改显示的Canvas
       * @name setCanvas
       * @function
       * @param {HTMLCanvasElement} canvas
       * @instance
       * @memberof CanvasLayer
       */
      setCanvas(canvas: HTMLCanvasElement): void;

      /**
       * 返回 Canvas 对象
       * @name getElement
       * @function
       * @instance
       * @memberof CanvasLayer
       * @return {HTMLCanvasElement} canvas 对象
       */
      getElement(): HTMLCanvasElement | undefined;

      /**
       * 返回 canvas 范围的经纬度
       * @name getBounds
       * @function
       * @instance
       * @memberof CanvasLayer
       * @return {Bounds} 范围经纬度
       */
      getBounds(): number[] | Bounds;

      /**
       * 设置 CanvasLayer 显示的范围
       * @name setBounds
       * @function
       * @instance
       * @memberof CanvasLayer
       */
      setBounds(bounds: Bounds): void;

      /**
       * 当canvas的内容发生改变是用于刷新图层，3D视图下调用，2D视图不需要调用
       * @name getBounds
       * @function
       * @instance
       * @memberof CanvasLayer
       */
      reFresh(): void;
    }

    /**
     * @public
     */
    export interface CanvasLayerOptions {
      zooms?: [number, number];
      bounds?: [number, number, number, number];
      opacity?: number;
      visible?: boolean;
      canvas?: HTMLCanvasElement;
      zIndex?: number;
    }

    /**
     * 构造圆形对象，通过CircleOptions指定多边形样式
     *
     * @public
     * @export
     * @class Circle
     * @implements {Event}
     * @param {CircleOptions}  opts
     * @param {LngLat} opts.center  圆心位置
     * @param {number} opts.radius  圆半径，单位:米
     * @param {number} [opts.zIndex=10]  多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
     * @param {boolean}  [opts.bubble = false] 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）
     * @param {string} [opts.cursor] 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
     * @param {string } [opts.strokeColor = #00D3FC] 轮廓线颜色，使用16进制颜色代码赋值。默认值为#00D3FC
     * @param {number} [opts.strokeOpacity = 0.9]  轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     * @param {number} [opts.strokeWeight = 2]  轮廓线宽度
     * @param {string} [opts.fillColor=#00B2D5]	多边形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
     * @param {number} [opts.fillOpacity=0.5] 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.5
     * @param {boolean} [opts.draggable=false] 设置多边形是否可拖拽移动，默认为false
     * @param {object} [opts.extData]  用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
     * @param {'solid'|'dashed'} [opts.strokeStyle = solid]  轮廓线样式，实线:solid，虚线:dashed
     * @param {number[]}  [opts.strokeDasharray] 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值：
     * 实线：[0,0,0]
     * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
     * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
     */
    export class Circle extends CombinePolygon<Required<CircleOptions>> {
      readonly className: OverlayType;

      _opts: Required<CircleOptions>;

      constructor(opts?: CircleOptions);

      /**
       * 设置圆中心点
       * @name setCenter
       * @function
       * @param {LngLatLike} center
       * @memberof Circle
       * @instance
       */
      setCenter(center: LngLatLike): void;

      /**
       * 设置圆形的半径
       * @name setRaius
       * @function
       * @param {number} radius
       * @memberof Circle
       * @instance
       */
      setRadius(radius: number): void;

      /**
       * 获取圆中心点
       * @name getCenter
       * @function
       * @return {LngLat} center
       * @memberof Circle
       * @instance
       */
      getCenter(): LngLat;

      /**
       * 获取圆形的半径
       * @name getRaius
       * @function
       * @return {number} radius
       * @memberof Circle
       * @instance
       */
      getRadius(): number;

      /**
       * @private
       *
       * @param {LngLatLike} center
       * @param {number} radius
       * @memberof Circle
       */
      setCenterAndRadius(center: LngLatLike, radius: number): void;

      /**
       * 判断指定点坐标是否在圆内
       * @name contains
       * @param {LngLatLike} point
       * @returns {boolean}
       * @function
       * @memberof Circle
       * @instance
       */
      /**
       * 修改圆属性（样式风格，包括组成圆形轮廓线的节点、轮廓线样式等。属性详情参看CircleOptions列表）
       * @name setOptions
       * @function
       * @param {CircleOptions} optsArg
       * @memberof Circle
       * @instance
       */
      setOptions(optsArg: CircleOptions): void;

      getBounds(): Bounds | undefined;
    }

    /**
     * 构造圆形对象，通过CircleOptions指定多边形样式
     *
     * @public
     * @export
     * @class CircleMarker
     * @param {CircleMarkerOptions}  opts
     * @param {LngLat} opts.center  圆心位置
     * @param {number} opts.radius  圆半径，单位:px 最大值64
     * @param {number} [opts.zIndex=10]  多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
     * @param {boolean}  [opts.bubble = false] 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）
     * @param {string} [opts.cursor] 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
     * @param {string } [opts.strokeColor = #00D3FC] 轮廓线颜色，使用16进制颜色代码赋值。默认值为#00D3FC
     * @param {number} [opts.strokeOpacity = 0.9]  轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     * @param {number} [opts.strokeWeight = 2]  轮廓线宽度
     * @param {string} [opts.fillColor=#00B2D5]	多边形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
     * @param {number} [opts.fillOpacity=0.5] 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.5
     * @param {boolean} [opts.draggable=false] 设置多边形是否可拖拽移动，默认为false
     * @param {object} [opts.extData]  用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
     */
    export class CircleMarker extends CoreCircleMarker {
      className: OverlayType;

      constructor(opts?: CircleMarkerOptions);

      init(optsArg?: CircleMarkerOptions): void;

      /**
       * 设置圆点的半径
       * @name setRadius
       * @function
       * @param {number} radius
       * @memberof CircleMarker
       * @instance
       */
      setRadius(radius: number): void;

      /**
       * 获取圆点中心
       * @name getCenter
       * @function
       * @returns {LngLat}
       * @memberof CircleMarker
       * @instance
       */
      getCenter(): LngLat;

      /**
       * 获取圆点的半径
       * @name getRadius
       * @function
       * @returns {number}
       * @memberof CircleMarker
       * @instance
       */
      getRadius(): number;

      /**
       * 判断指定点坐标是否在圆内
       * @name contains
       * @param {LngLatLike} point
       * @returns {boolean}
       * @function
       * @memberof CircleMarker
       * @instance
       */
      'contains': (originPoint: LngLatLike) => boolean;

      'containsWithPixel': (pixel: Pixel) => boolean;

      /**
       * 修改圆点标记的属性（样式风格，包括轮廓线、填充色等。属性详情参看CircleMarkerOptions列表）
       * @name setOptions
       * @function
       * @param {CircleMarkerOptions} optsArg
       * @memberof CircleMarker
       * @instance
       */
      setOptions(optsArg: CircleMarkerOptions): void;

      /**
       * 获取圆点的属性
       * @name getOptions
       * @function
       * @returns {CircleMarkerOptions}
       * @memberof CircleMarker
       * @instance
       */
      getOptions(): any;

      getBounds(): Bounds | undefined;
    }

    /**
     * @public
     */
    export type CircleMarkerOptions = PolygonSharedOptions & {
      center?: LngLatLike;
      radius?: number;
    };

    /**
     * @public
     * @private
     */
    export type CircleOptions = PolygonSharedOptions & {
      center?: LngLatLike;
      radius?: number;
    };

    /**
     * 内部模块
     * @name CombinePolygon
     * @public
     * @private
     */
    abstract class CombinePolygon<T = any> extends CorePolygon {
      abstract setOptions(optsArg: any): void;

      /**
       * 获取圆形的属性
       *
       * @name getOptions
       * @function
       * @returns {CircleOptions}
       * @memberof Circle
       * @instance
       */
      /**
       * 获取矩形的属性
       *
       * @name getOptions
       * @function
       * @returns {RectangleOptions}
       * @memberof Rectangle
       * @instance
       */
      /**
       * 获取椭圆的属性
       *
       * @name getOptions
       * @function
       * @returns {EllipseOptions}
       * @memberof Ellipse
       * @instance
       */
      getOptions(): any;

      /**
       * 获取面积,平米
       * @name getArea
       * @function
       * @returns {number}
       * @memberof Rectangle
       * @instance
       */
      /**
       * 获取面积,平米
       * @name getArea
       * @function
       * @returns {number}
       * @memberof Circle
       * @instance
       */
      /**
       * 获取面积,平米
       * @name getArea
       * @function
       * @returns {number}
       * @memberof Ellipse
       * @instance
       */
      /**
       * 判断指定点坐标是否在椭圆内
       * @name contains
       * @function
       * @param {LngLatLike} point
       * @memberof Ellipse
       * @instance
       */
      'contains': (originPoint: LngLatLike) => boolean;
    }

    /**
     * @public
     * @private
     */
    abstract class CombinePolyline<T> extends CorePolyline {
      /**
       * 获取线的属性
       * @name getOptions
       * @function
       * @returns {BezierCurveOptions}
       * @memberof BezierCurve
       * @instance
       */
      getOptions(): any;
    }

    /**
     * 右键菜单 [亲手试一试](https://lbs.amap.com/api/jsapi-v2/example/contextmenu/default-contextmenu)
     *
     * @public
     * @export
     * @class ContextMenu
     * @name ContextMenu
     * @extends {OverlayDOM}
     * @param {OverlayOptions} opts 右键菜单参数
     * @param {Vector2|LngLat} opts.position 右键菜单显示的位置
     * @param {string|HTMLElement} opts.content 右键菜单内容（针对自定义菜单时，添加菜单内容及功能。可以是HTML要素字符串或者HTML DOM对象。）
     * @example
     * // 创建一个右键菜单实例
     * var contextMenu = new AMap.ContextMenu();
     * //右键放大
     * contextMenu.addItem("放大一级", function () {
     *     var zoom = map.getZoom();
     *     map.setZoom(zoom++);
     * }, 0);
     * // 在地图上指定位置打开右键菜单
     * contextMenu.open(map, [116.397389,39.909466]);
     */
    export class ContextMenu extends OverlayDOM {
      type: string;

      className: string;

      constructor(opts?: OverlayOptions);

      /**
       * 打开右键菜单
       * @name open
       * @param {Map} map
       * @param {Vector2} position
       * @memberof ContextMenu
       * @instance
       * @function
       */
      open(map: Map_2, position: Vector2): void;

      /**
       * 关闭右键菜单
       * @name close
       * @memberof ContextMenu
       * @instance
       * @function
       */
      close(): void;

      /**
       * 菜单添加一条内容
       * @name addItem
       * @param {string} text
       * @param {EventListener} fn
       * @param {number} num
       * @memberof ContextMenu
       * @instance
       * @function
       */
      addItem(text: string, fn: EventListener, num: number): void;

      /**
       * 菜单移除一条内容
       * @name removeItem
       * @param {string} text
       * @param {EventListener} fn
       * @memberof ContextMenu
       * @instance
       * @function
       */
      removeItem(text: string, fn: EventListener): void;

      /**
       * @private
       */
      getBounds(): null;
    }

    /**
     * 地图控件基类，可扩展做自定义地图控件。
     *
     * @public
     * @param {ControlConfig} opts 默认参数
     * @param {string|object} opts.position 控件停靠位置
     * { top: 5; left: 5; right: 5; bottom: 5 } 或者
     * 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
     * @param {[number, number]} opts.offset 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
     * @export
     * @abstract
     * @class Control
     * @extends {Event}
     */
    export abstract class Control extends Event {
      map: Map_2;

      constructor(opts: ControlConfig);

      /**
       * 添加控件到地图上
       *
       * @name addTo
       * @function
       * @param {Map} map 地图实例
       * @instance
       * @memberof Control
       */
      addTo(map: Map_2): void;

      /**
       * 从地图上移除控件
       *
       * @name remove
       * @private
       * @function
       * @param {Map} map 地图实例
       * @instance
       * @memberof Control
       */
      removeFrom(map: Map_2): void;

      /**
       * 从地图上移除控件
       *
       * @name remove
       * @function
       * @instance
       * @memberof Control
       */
      remove(): void;

      /**
       * 设置控件可见
       * @name show
       * @function
       * @instance
       * @memberof Control
       */
      show(): void;

      /**
       * 设置控件隐藏
       * @name hide
       * @function
       * @instance
       * @memberof Control
       */
      hide(): void;
    }

    /**
     * @public
     */
    export interface ControlConfig {
      position:
        | {
            top?: string;
            left?: string;
            right?: string;
            bottom?: string;
          }
        | 'LT'
        | 'RT'
        | 'LB'
        | 'RB';
      offset?: [number, number];
      showControlButton?: boolean;
      visible?: boolean;
    }

    /**
     * 地球上同一个地理位置的经纬度，在不同的坐标系中，会有少于偏移，国内目前常见的坐标系主要分为三种： </br>
     * 1. 地球坐标系——WGS84：常见于 GPS 设备，Google 地图等国际标准的坐标体系。 </br>
     * 2. 火星坐标系——GCJ-02：中国国内使用的被强制加密后的坐标体系，高德坐标就属于该种坐标体系。 </br>
     * 3. 百度坐标系——BD-09：百度地图所使用的坐标体系，是在火星坐标系的基础上又进行了一次加密处理。 </br>
     * 因此在使用不同坐标系前，我们需要使用 AMap.convertFrom() 方法将这些非高德坐标系进行转换。 </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/other-gaode/othertoamap-more/)
     *
     * @public
     * @function convertFrom
     * @param {LngLat} lnglat 需要转换的坐标或者坐标组
     * @param {String} [type='gps'] 坐标类型
     * @param {Function} [cbk] 转换成功后的回调函数
     * @example
     * var gps = [116.3, 39.9];
     * AMap.convertFrom(gps, 'gps', function (status, result) {
     *   if (result.info === 'ok') {
     *     var lnglats = result.locations; // Array.<LngLat>
     *   }
     * });
     */
    export function convertFrom(lnglat: any, type: string, cbk: any): void;

    /**
     * @public
     * @private
     */
    abstract class CoreCircleMarker extends VectorOverlay {
      readonly className: OverlayType;

      /**
       * 设置圆点中心
       * @name setCenter
       * @function
       * @param {LngLatLike} center
       * @returns {void}
       * @memberof CoreCircleMarker
       * @instance
       */
      setCenter(center: LngLatLike): void;

      destroy(): void;
    }

    /**
     * @public
     * @private
     */
    class CoreCustomLayer extends Layer {
      CLASS_NAME: string;

      constructor(canvas: HTMLCanvasElement, opts: Partial<CustomLayerOption>);

      /**
       * @private
       */
      setOpacity(op: number): void;

      /**
       * 设置图层层级
       * @instance
       * @name setzIndex
       * @param {number} zIndex 图层层级
       * @memberof CustomLayer
       */
      setzIndex(zIndex: number): void;
    }

    /**
     * @public
     */
    class CoreDistrictLayer extends TileLayer {
      CLASS_NAME: string;

      SOC: string;

      getLayerConfig(): any;

      getSourceConfig(): DistrictSourceSpec;

      getLayerOptions(): any;

      getState(): any;

      getDistrictByContainerPos(pixel: number[]): any;

      getSourceId(): string;

      destroy(): void;

      reload(): void;
    }

    /**
     * @public
     * @private
     */
    class CoreImageLayer extends Layer {
      CLASS_NAME: string;

      constructor(opts: ImageLayerOptions);
    }

    /**
     * @public
     * @private
     */
    class CoreMap extends Event {
      static readonly defaultZooms: [number, number];

      className: string;

      constructor(div: HTMLDivElement | null, options: MapOptions);

      /**
       * 返回地图对象的容器
       *
       * @name getContainer
       * @function
       * @memberof Map
       * @instance
       * @returns {HTMLElement} 地图 DOM 容器
       */
      getContainer(): HTMLDivElement;

      /**
       * 获取地图容器尺寸，单位：像素
       *
       * @name getSize
       * @function
       * @instance
       * @memberof Map
       * @return {Size} 地图容器尺寸
       */
      getSize(): Size;

      /**
       * 添加图层到地图上
       *
       * @name addLayer
       * @function
       * @param {Layer} layer 地图图层对象
       * @instance
       * @memberof Map
       */
      addLayer(layer: Layer): void;

      /**
       * 从地图上移除图层
       *
       * @name removeLayer
       * @function
       * @param {Layer} layer 地图图层
       * @instance
       * @memberof Map
       */
      removeLayer(layer: Layer): void;

      /**
       * 将多个图层一次替代地图上原有图层，会移除地图原有图层
       *
       * @name setLayers
       * @function
       * @param {Layer[]} layers 地图图层数组
       * @instance
       * @memberof Map
       */
      setLayers(layers: Layer[]): void;

      /**
       * 获取地图图层数组，数组为一个或多个图层
       *
       * @name getLayers
       * @function
       * @instance
       * @memberof Map
       * @return {Layer[]} 地图图层数组
       */
      getLayers(): Layer[];

      getLayersDangerous(): Layer[];

      /**
       * 获取当前地图状态信息，包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、
       * 是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）等
       *
       * @name getStatus
       * @function
       * @instance
       * @memberof Map
       * @returns {object} 地图状态信息映射集合
       */
      getStatus(): {
        dragEnable: boolean;
        zoomEnable: boolean;
        doubleClickZoom: boolean;
        keyboardEnable: boolean;
        jogEnable: boolean;
        scrollWheel: boolean;
        animateEnable: boolean;
        touchZoomCenter: number;
        touchZoom: boolean;
        pitchEnable: boolean;
        rotateEnable: boolean;
        showBuildingBlock: boolean | undefined;
        isHotspot: boolean;
        mapstyleUrl: string;
        features: string | string[] | undefined;
        allBubble: boolean;
        pickWhenMoving: boolean;
      };

      /**
       * 设置当前地图显示状态，包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、
       * 是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）等，
       * [相关示例](https://lbs.amap.com/api/javascript-api/example/map/set-map-status)
       *
       * @name setStatus
       * @function
       * @param {object} status 地图状态值映射集合
       * @instance
       * @memberof Map
       */
      setStatus(status: any): void;

      /**
       * @private
       */
      getOutseaState(): boolean;

      /**
       * @private
       */
      getMapboxStyle(): any;

      /**
       * 获取地图默认鼠标指针样式
       *
       * @name getDefaultCursor
       * @function
       * @instance
       * @memberof Map
       * @returns {string} 地图鼠标指针样式
       */
      getDefaultCursor(): string;

      /**
       * 设置地图默认鼠标指针样式
       * @param {string} cursor 设置鼠标指针默认样式，参数cursor应符合CSS的cursor属性规范。可为CSS标注中的光标样式，
       * 如：setCursor(“pointer”)等；或者自定义的光标样式，
       * 如：setCursor("url('https://lbs.amap.com/webapi/static/Images//0.png'),pointer")
       *
       * @name setDefaultCursor
       * @function
       * @instance
       * @memberof Map
       * @function
       */
      setDefaultCursor(cursor: string): void;

      /**
       * 注销地图对象，并清空地图容器
       * @name destroy
       * @function
       * @instance
       * @memberof Map
       */
      destroy(): void;

      /**
       * 获取Map的限制区域
       *
       * @name getLimitBounds
       * @function
       * @instance
       * @memberof Map
       * @function
       */
      getLimitBounds(): Bounds | undefined;

      /**
       * 设置 Map 的限制区域，设定区域限制后，传入参数为限制的 Bounds。地图仅在区域内可拖拽
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/map/limit-map-show-range/)
       *
       * @param {number[]|Bounds}
       * @name setLimitBounds
       * @function
       * @instance
       * @memberof Map
       * @function
       */
      setLimitBounds(bounds: number[] | Bounds): void;

      /**
       * 清除 Map 的限制区域
       *
       * @name clearLimitBounds
       * @function
       * @instance
       * @memberof Map
       * @function
       */
      clearLimitBounds(): void;

      /**
       * 获取地图缩放等级范围
       *
       * @name getZooms
       * @function
       * @instance
       * @memberof Map
       * @return {[number,number]} zooms
       * @function
       */
      getZooms(): [number, number];

      /**
       * 设置地图缩放等级范围
       *
       * @name setZooms
       * @param {[number,number]} zooms
       * @function
       * @instance
       * @memberof Map
       */
      setZooms(zooms: [number, number]): void;

      /**
       * @private
       */
      getSkyColor(optimalZoom: number): number[];

      /**
       * 地图帧的标志
       * @private
       * @memberof WorkerEvents
       */
      getStamp(): number;

      /**
       * @private
       */
      getLabelRejectMask(): boolean;
    }

    /**
     * @public
     * @private
     */
    abstract class CorePolygon extends VectorOverlay {
      _path: Array<[number, number]> | Array<Array<[number, number]>>;

      toString(): string;

      destroy(): void;
    }

    /**
     * @public
     * @private
     */
    abstract class CorePolyline extends VectorOverlay {
      destroy(): void;
    }

    /**
     * @public
     */
    class CoreVectorLayer extends Layer {
      map: Map_2;

      CLASS_NAME: string;

      constructor(opts?: any);

      add(overlays: VectorOverlay | VectorOverlay[]): void;

      remove(overlays: VectorOverlay | VectorOverlay[]): void;

      getOverlayByPosition(e: { lnglat: LngLat; pixel: Pixel }): VectorOverlay | null;

      getAllOverlays(type?: string): VectorOverlay[];
    }

    /**
     * 国家图层
     * @public
     * @class CountryLayer
     * @extends {DistrictLayer}
     */
    class CountryLayer extends DistrictLayer {
      CLASS_NAME: string;

      constructor(opts: DistrictLayerOptions);
    }

    /**
     * @public
     * @private
     */
    export const createDefaultLayer: (opts?: any) => NebulaLayer | TileLayer;

    /**
     * 自定义图层是一种完全由开发者来指定绘制方法的图层 </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/selflayer/custom-layer/)
     *
     * @param {HTMLCanvasElement} canvas canvas 对象
     * @param {CustomLayerOption} opts 默认图层参数
     * @param {Function} opts.render 绘制函数，初始化完成时候，开发者需要给该图层设定render方法， </br>
     * 该方法需要实现图层的绘制，API会在合适的时机自动调用该方法
     * @param {[Number,Number]} [opts.zooms=[2,20]] 图层缩放等级范围，默认 [2, 20]
     * @param {Number} [opts.opacity=1] 图层透明度，默认为 1
     * @param {Boolean} [opts.visible=true] 图层是否可见，默认为 true
     * @param {Number} [opts.zIndex=120] 图层的层级，默认为 120
     * @export
     * @class CustomLayer
     * @extends {Layer}
     * @example
     * var cLayer = new AMap.CustomLayer(canvas, {
     *      zooms: [2, 18],
     *      zIndex: 120,
     *      render() {
     *          // 对 canvas 进行绘制
     *      }
     * })
     * @public
     */
    export class CustomLayer extends CoreCustomLayer {
      constructor(canvas: HTMLCanvasElement, opts: CustomLayerOption);
    }

    /**
     * @public
     */
    export interface CustomLayerOption {
      opacity?: number;
      visible?: boolean;
      zIndex?: number;
      zooms?: [number, number];
      render: () => void;
      alwaysRender?: boolean;
    }

    /**
     * @typedef {Object} DistrictLayerOptions@typedef {Object} DistrictLayerOptions
     * @property {String} adcode 行政区的编码 [adcode与省市行政区对照表](https://a.amap.com/lbs/static/file/AMap_adcode_citycode.xlsx.zip)
     * @property {String} SOC 设定显示的国家
     * [SOC 国家代码、名称、Bounds对照表下载](https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json)
     * @property {Number} depth 设定数据的层级深度，depth为0的时候只显示国家面，depth为1的时候显示省级，
     * 当国家为中国时设置depth为2的可以显示市一级
     * @property {DistrictLayerStyle} styles 为简易行政区图设定各面的填充颜色和描边颜色。styles各字段的值可以是颜色值，也可以是一个返回颜色值* 的回调函数function。支持的颜色格式有：
     * 1. #RRGGBB，如：'#FFFFFF'
     * 2. rgba()，如：'rgba(255,255,255,1)'
     * 3. rgb()，如：'rgb(255,255,255)'
     * 4. [r,g,b,a]，如：[1,1,1,1]
     * 5. ''，代表不赋予颜色
     * @property {Number} zIndex 图层的层级，默认为 80
     * @property {Number} opacity 图层透明度，默认为 1
     * @property {Boolean} visible 图层是否可见，默认为 true
     * @property {[number,number]} zooms 图层缩放等级范围，默认 [2, 20]
     */
    /**
     * @private
     * @typedef {Object} DistrictLayerStyle@typedef {Object} DistrictLayerStyle
     * @property {Number} stroke-width 描边线宽
     * @property {String[]|String|Function} coastline-stroke 海岸线颜色
     * @property {String[]|String|Function} nation-stroke 国境线颜色
     * @property {String[]|String|Function} province-stroke 省界颜色
     * @property {String[]|String|Function} city-stroke 城市界颜色
     * @property {String[]|String|Function} county-stroke 区/县界颜色
     * @property {String[]|String|Function} fill 填充色
     * @export
     * @interface DistrictLayerStyle
     */
    /**
     * @public
     * 为了满足基于行政区块的数据可视化、行政区边界展示等开发需求，我们通过AMap.DistrictLayer插件提供了一组简易行政区图层，包括：</br>
     * 世界简易行政区图层 AMap.DistrictLayer.World </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/district/district-world) </br>
     * 国家简易行政区图层 AMap.DistrictLayer.Country </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/district/district-chn) </br>
     * 省市简易行政区图层 AMap.DistrictLayer.Province </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/district/district-pro) </br>
     * @param {DistrictLayerOptions} opts 图层初始化参数
     * @param {String} opts.adcode 行政区的编码 [adcode与省市行政区对照表](https://a.amap.com/lbs/static/file/AMap_adcode_citycode.xlsx.zip)
     * @param {String} [opts.SOC='CHN'] 设定显示的国家
     * [SOC 国家代码、名称、Bounds对照表下载](https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json)
     * @param {Number} [opts.depth=0] 设定数据的层级深度，depth为0的时候只显示国家面，depth为1的时候显示省级，
     * 当国家为中国时设置depth为2的可以显示市一级
     * @param {Number} [opts.zIndex=80] 图层的层级，默认为 80
     * @param {Number} [opts.opacity=1] 图层透明度，默认为 1
     * @param {Boolean} [opts.visible=true] 图层是否可见，默认为 true
     * @param {[number,number]} [opts.zooms=[2,20]] 图层缩放等级范围，默认 [2, 20]
     * @param {DistrictLayerStyle} opts.styles 为简易行政区图设定各面的填充颜色和描边颜色。
     * styles各字段的值可以是颜色值，也可以是一个返回颜色值* 的回调函数function。支持的颜色格式有： </br>
     * 1. #RRGGBB，如：'#FFFFFF' </br>
     * 2. rgba()，如：'rgba(255,255,255,1)' </br>
     * 3. rgb()，如：'rgb(255,255,255)' </br>
     * 4. [r,g,b,a]，如：[1,1,1,1] </br>
     * 5. ''，代表不赋予颜色
     * @param {Number|Function} [opts.styles.stroke-width=1] 描边线宽
     * @param {Number[]|Function} [opts.styles.dash=[undefined] 描边虚线样式
     * @param {Number|Function} [opts.styles.zIndex=0] 图层中每个区域层级，数值越大，层级越高
     * @param {String[]|String|Function} [opts.styles.coastline-stroke=[0.18, 0.63, 0.94, 1]] 海岸线颜色
     * @param {String[]|String|Function} [opts.styles.nation-stroke=[0.35, 0.35, 0.35, 1]] 国境线颜色
     * @param {String[]|String|Function} [opts.styles.province-stroke=[0.5, 0.5, 0.5, 1]] 省界颜色
     * @param {String[]|String|Function} [opts.styles.city-stroke=[0.7, 0.7, 0.7, 1]] 城市界颜色
     * @param {String[]|String|Function} [opts.styles.county-stroke=[0.85, 0.85, 0.85, 1]] 区/县界颜色
     * @param {String[]|String|Function} [opts.styles.fill=[1,1,1,1]] 填充色
     *
     * @export
     * @class DistrictLayer
     * @extends {Layer}
     */
    export class DistrictLayer extends CoreDistrictLayer {
      static 'World': typeof WorldLayer;

      static 'Country': typeof CountryLayer;

      static 'Province': typeof ProvinceLayer;

      distsBounds?: any;

      CLASS_NAME: string;

      constructor(opts: DistrictLayerOptions);

      /**
       * 设定显示的国家 SOC
       * @name setSOC
       * @function
       * @param {String} SOC SOC
       * @instance
       * @memberof DistrictLayer
       */
      setSOC(SOC: string): void;

      /**
       * 设置 adcodes 值
       * @name setDistricts
       * @function
       * @param {any[] | string | number} adcodes adcodes
       * @instance
       * @memberof DistrictLayer
       */
      setDistricts(adcodes: any[] | string | number): void;

      /**
       * 获取 adcodes
       * @name getDistricts
       * @function
       * @instance
       * @memberof DistrictLayer
       * @returns {*} adcodes
       */
      getDistricts(): any;

      /**
       * 设置样式信息
       * @name setStyles
       * @function
       * @param {DistrictLayerStyle} styles 样式信息
       * @instance
       * @memberof DistrictLayer
       */
      setStyles(styles: DistrictLayerStyle): void;

      /**
       * 获取样式信息
       * @name getStyles
       * @function
       * @instance
       * @memberof DistrictLayer
       * @returns {DistrictLayerStyle} 样式
       */
      getStyle(): DistrictLayerStyle | undefined;

      /**
       * 设置 adcodes 值
       * @name setAdcode
       * @function
       * @param {any[] | string | number} adcodes adcodes
       * @instance
       * @memberof DistrictLayer
       */
      setAdcode(adcodes: any[] | string | number): void;

      /**
       * 根据 adcodes 或者国家 SOC 码缩放范围
       * @name setFitViewByAdcode
       * @function
       * @param {String[] | String} adcodes SOC 或者 adcodes
       * @param {Boolean} [immediately=false] 立即缩放到指定位置
       * @param {Number[]} [avoid=[0,0,0,0]] 距离边框的内边距，顺序：上、下、左、右
       * @instance
       * @memberof DistrictLayer
       * @private
       */
      setFitViewByAdcode(adcodes: any[] | string | number, immediately: boolean | undefined, avoid: number[]): void;

      on(type: string, fn: any, context: any, once?: boolean): this;

      /**
       * @private
       * @memberof DistrictLayer
       */
      onAdd(): void;
    }

    /**
     * 行政区图层默认参数
     * @public
     * @private
     * @export
     * @interface DistrictLayerOptions
     */
    export interface DistrictLayerOptions {
      id?: string;
      url?: string;
      tileUrl?: string;
      zooms?: [number, number];
      dataZooms?: [number, number];
      opacity?: number;
      tileSize?: number;
      zIndex?: number;
      visible?: boolean;
      SOC?: string;
      adcode?: number[];
      depth?: number;
      styles?: DistrictLayerStyle;
      depthTest?: boolean;
    }

    /**
     * @public
     */
    export interface DistrictLayerStyle {
      'stroke-width'?: number;
      'coastline-stroke'?: string;
      'nation-stroke'?: string;
      'province-stroke'?: string;
      'city-stroke'?: string;
      'county-stroke'?: string;
      fill?: string;
      dash?: number[];
      zIndex?: number;
    }

    /**
     * @public
     */
    interface DistrictSourceSpec {
      readonly id: string;
      type: string;
      tileSize: number;
      tileUrl: string;
      zooms: [number, number];
      dataZooms: [number, number];
      projection: string;
      SOC: string;
    }

    /**
     * @public
     * @constant
     */
    export const DomUtil: {
      /**
       * 获取DOM元素的大小
       * @name getViewport
       * @function
       * @param {HTMLElement} obj
       * @returns {[number, number]}
       * @memberof DomUtil
       * @instance
       */
      getViewport(obj: HTMLElement): [number, number];

      /**
       * 获取DOM元素距离窗口左上角的距离
       * @name getViewportOffset
       * @param {HTMLElement} element
       * @returns {[number, number]}
       * @function
       * @memberof DomUtil
       * @instance
       */
      getViewportOffset(element: HTMLElement): number[];

      /**
       * 在parentNode内部创建一个className类名的tagName元素
       * @name create
       * @param {string} tagName 节点类型
       * @param {HTMLElement} container 上级节点对象
       * @param {string} className
       * @param {string} position 插入位置
       * @returns {HTMLElement}
       * @function
       * @memberof DomUtil
       * @instance
       */
      create(
        tagName: string,
        container: HTMLElement | null,
        className?: string | undefined,
        position?: string | undefined
      ): HTMLElement;
      toggleClass(el: HTMLElement, name: string, on: boolean): void;
      /**
       * DOM元素是否包含className
       * @name hasClass
       * @function
       * @param {HTMLElement} el
       * @param {string} name
       * @returns {boolean}
       * @function
       * @memberof DomUtil
       * @instance
       */
      hasClass(el: HTMLElement, name: string): boolean | undefined;
      /**
       * 给DOM元素添加一个className
       * @name addClass
       * @function
       * @param {HTMLElement} el
       * @param {string} name
       * @function
       * @memberof DomUtil
       * @instance
       */
      addClass(el: HTMLElement, name: string): void;
      /**
       * 给DOM元素设置为className样式
       * @name setClass
       * @param {HTMLElement} el
       * @param {string} name
       * @function
       * @memberof DomUtil
       * @instance
       */
      setClass(el: HTMLElement, name: string): void;
      /**
       * 给DOM元素删除一个className
       * @name removeClass
       * @param {HTMLElement} el
       * @param {string} name
       * @function
       * @memberof DomUtil
       * @instance
       */
      removeClass(el: HTMLElement, name: string): void;

      /**
       * 将DOM元素从父节点删除
       *
       * @name remove
       * @param {HTMLElement} el
       * @function
       * @memberof DomUtil
       * @instance
       */
      remove(el: HTMLElement): void;
      /**
       * 清空DOM元素
       * @name empty
       *
       * @param {HTMLElement} el
       * @function
       * @memberof DomUtil
       * @instance
       */
      empty(el: HTMLElement): void;
      closest(elem: HTMLElement, className: string): HTMLElement | null;

      /**
       * 给DOM元素旋转一个角度，以center为中心，center以元素左上角为坐标原点
       * @name rotate
       * @param {HTMLElement} target
       * @param {number} angle
       * @param {Pixel} center
       * @function
       * @memberof DomUtil
       * @instance
       */
      rotate(target: HTMLElement, angle: number, center: Pixel): void;
      /**
       * 给DOM元素删除一组样式，Object同样式表
       * @name setCss
       *
       * @param {HTMLElement | HTMLElement[]} obj
       * @param {Object} css
       * @function
       * @memberof DomUtil
       * @instance
       */
      setCss(obj: HTMLElement | HTMLElement[], css: any): any;
      /**
       * 给DOM元素设定一个透明度
       *
       * @name setOpacity
       * @param {HTMLElement} el
       * @param {number} value
       * @function
       * @memberof DomUtil
       * @instance
       */
      setOpacity(el: HTMLElement, value: number): void;
    };

    /**
     * @public
     * @private
     */
    abstract class DragObject extends Overlay {}

    /**
     * 构造多边形对象，通过EllipseOptions指定多边形样式
     *
     * @public
     * @export
     * @class Ellipse
     * @implements {Event}
     * @param {EllipseOptions} opts
     * @param {LngLatLike} opts.center 椭圆圆心
     * @param {[number,number]} opts.radius 椭圆的半径，用2个元素的数组表示，单位：米
     * 如： radius: [1000, 2000] 表示横向半径是1000，纵向的半径是2000
     * 默认值：[1000, 1000]
     * @param {number} [opts.zIndex=10]  椭圆覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
     * @param {boolean}  [opts.bubble = false] 是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * @param {string} [opts.cursor] 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
     * @param {string } [opts.strokeColor = #00D3FC] 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
     * @param {number} [opts.strokeOpacity = 0.9]  轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     * @param {number} [opts.strokeWeight = 2]  轮廓线宽度
     * @param {string} [opts.fillColor=#00B2D5]	椭圆填充颜色，使用16进制颜色代码赋值，如：#00B2D5
     * @param {number} [opts.fillOpacity=0.5] 椭圆填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.5
     * @param {boolean} [opts.draggable=false] 设置椭圆是否可拖拽移动，默认为false
     * @param {object} [opts.extData]  用户自定义属性，支持JavaScript API任意数据类型，如 id 等
     * @param {'solid'|'dashed'} [opts.strokeStyle = solid]  轮廓线样式，实线:solid，虚线:dashed
     * @param {number[]}  [opts.strokeDasharray] 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值：
     * 实线：[0,0,0]
     * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
     * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
     */
    export class Ellipse extends CombinePolygon<Required<EllipseOptions>> {
      readonly className: OverlayType;

      /**
       * @private
       */
      constructor(opts?: EllipseOptions);

      /**
       * 设置椭圆的中心点
       * @name setCenter
       * @function
       * @param {LngLatLike} center
       * @memberof Ellipse
       * @instance
       */
      setCenter(center: LngLatLike): void;

      /**
       * 设置椭圆的半径
       * @name setRadius
       * @function
       * @param {[number, number]} radius
       * @memberof Ellipse
       * @instance
       */
      setRadius(radius: [number, number]): void;

      /**
       * 获取椭圆的圆心
       * @name getCenter
       * @function
       * @returns {LngLat}
       * @memberof Ellipse
       * @instance
       */
      getCenter(): LngLat;

      /**
       * 获取椭圆的半径
       *
       * @name getRadius
       * @function
       * @returns {number}
       * @memberof Ellipse
       * @instance
       */
      getRadius(): [number, number];

      /**
       * @private
       *
       * @param {LngLatLike} center
       * @param {[number, number]} radius
       * @memberof Ellipse
       */
      setCenterAndRadius(center: LngLatLike, radius: [number, number]): void;

      getBounds(): Bounds | undefined;

      /**
       * 修改椭圆属性（样式风格，包括组成椭圆轮廓线的节点、轮廓线样式等。属性详情参看[Ellipse](#Ellipse)
       * @name setOptions
       * @function
       * @param {EllipseOptions} optsArg
       * @memberof Ellipse
       * @instance
       */
      setOptions(optsArg: EllipseOptions): void;
    }

    /**
     * @public
     */
    export type EllipseOptions = PolygonSharedOptions & {
      center?: LngLatLike;
      radius?: [number, number];
    };

    /**
     * JSAPI 的所有类型（地图、图层、覆盖物等）都实现了事件接口，用于给当前实例对象绑定、移除、清理事件回调
     * @export
     * @public
     * @interface Event
     * @name Event
     * @example
     *
     * // 声明点击事件的回调函数
     * function onClick(e){
     *     console.log(e);
     * }
     * // 给地图实例绑定点击事件 onClick
     * map.on('click', onClick);
     *
     * // 移除地图实例的 onClick 事件绑定
     * map.off('click', onClick);
     *
     * // 清除地图实例上的所有 click 事件绑定
     * map.clearEvents('click');
     *
     * // 覆盖物绑定鼠标移动事件
     * polygon.on('mousemove',console.log);
     *
     * // 覆盖物绑定事件判断
     * polygon.hasEvents('mousemove',console.log);
     */
    export class Event implements Eventable {
      /**
       * @private
       */
      static addListener(intance: any, eventName: string, cb: any): void;

      /**
       * @private
       */
      static trigger(intance: any, eventName: string, data: any): void;

      /**
       * @private
       */
      static clearListeners(instance: any, eventName: string): void;

      /**
       * @private
       */
      static addDomListener(intance: HTMLElement, eventName: string, cb: any): void;

      static extend(types: string | string[], from: Eventable, target: Eventable): void;

      /**
       * 给实例绑定事件回调函数，同一个类型、同一个回调函数、同一个上下文只会绑定一次
       * @name on
       * @function
       * @param {String} type 事件类型
       * @param {Function} function 回调函数
       * @param {Object} context 事件上下文，缺省为实例本身
       * @param {Boolean} once 是否只执行一次
       * @return {Object} 当前实例
       * @memberof Event
       * @instance
       */
      on(type: string | string[], fn: (e: any) => void, context?: any, once?: boolean): this;

      /**
       * 移除当前实例的某一个事件回调
       * @name off
       * @function
       * @param {String} type 事件类型
       * @param {Function} function 事件回调函数
       * @param {Object} context 事件上下文，缺省为当前实例
       * @return {Object} 当前实例
       * @memberof Event
       * @instance
       */
      off(type: string, fn: (e: any) => void, context?: any): this;

      /**
       * 判断当前实例是否已经绑定了某个事件回调
       * @name hasEvents
       * @function
       * @param {String} type 事件类型
       * @param {Function} function 事件回调
       * @param {Object} context 事件上下文
       * @return {Boolean}
       * @memberof Event
       * @instance
       */
      hasEvents(type: string, fn: (e: any) => void, context?: any): boolean;

      /**
       * 清除当前实例某一类型的全部事件回调
       * @name clearEvents
       * @function
       * @param {String} type 事件类型，如果此参数为空，清除实例上的所有绑定的事件回调
       * @return {Object} 当前实例
       * @memberof Event
       * @instance
       */
      clearEvents(type: string): this;

      /**
       * 模拟触发当前实例的某个事件
       * @name emit
       * @function
       * @param {String} type 事件类型
       * @param {Object} data 事件回调时返回的数据，模拟的事件体应该完整，否则可能导致报错
       * @return {Object} 当前实例
       * @memberof Event
       * @instance
       */
      emit(type: string, data?: any): this;

      getEvents(): Record<string, any[]>;
    }

    /**
     * @public
     * @private
     */
    export interface Eventable {
      on(...arg: any[]): void;
      off(...arg: any[]): void;
      emit(...arg: any[]): void;
    }

    /**
     * @public
     * @private
     */
    interface Eventable_2 {
      on(...arg: any[]): void;
      off(...arg: any[]): void;
      emit(...arg: any[]): void;
    }

    /**
     * @public
     * @private
     */
    export const extend: (dest: any, ...args: any) => any;

    /**
     * 图块切片加载完成事件
     * @event complete
     * @memberof RoadNet
     * @instance
     */
    /**
     * 灵活切片图层，继承自AMap.TileLayer，开发者可通过构造时传入给其传入createTile字段来指定每一个切片的内容 </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/selflayer/flex-canvas/)
     *
     * @param {FlexibleLayerOptions} opts
     * @param {Number} opts.cacheSize 缓存瓦片数量
     * @param {function(x,y,z,success,fail)} opts.createTile 由开发者实现，由API自动调用，xyz分别为切片横向纵向编号和层级，切片大小
     * 256。假设每次创建的贴片为A(支持img或者canvas)，当创建或者获取成功时请回调success(A)，不需要显示或者失败时请回调fail()
     * @param {[Number,Number]} [opts.zooms=[2,20]] 支持的缩放级别范围，默认范围 [2-20]
     * @param {Number} [opts.opacity=1] 透明度，默认 1
     * @param {Boolean} [opts.visible=true] 是否显示，默认 true
     * @param {Number} [opts.zIndex=4] 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
     * @param {Number} [opts.tileSize=256] 切片大小，取值： </br>
     * 256，表示切片大小为256*256， </br>
     * 128，表示切片大小为128*128， </br>
     * 64，表示切片大小为64*64。默认值为256
     * @export
     * @class Flexible
     * @extends {TileLayer}
     * @public
     */
    class Flexible extends TileLayer {
      CLASS_NAME: string;

      constructor(opts?: FlexibleLayerOptions);
    }

    /**
     * @public
     */
    export interface FlexibleLayerOptions {
      url?: string;
      blend?: boolean;
      params?: any;
      zooms?: [number, number];
      opacity?: number;
      zIndex?: number;
      visible?: boolean;
    }

    /**
     * GeometryUtil为一组空间数据计算的函数库，v1.4.2新增。支持点线面的空间关系计算、长度、面积计算等等，
     * @public
     * @name GeometryUtil
     * @constant GeometryUtil
     */
    export const GeometryUtil: IGeometryUtil;

    /**
     * @public
     */
    export let getConfig: getConfigType;

    /**
     * @private
     * @public
     */
    type getConfigType = () => {
      key: string;
      host: string;
      server: string;
      protocol: string;
      version: string;
      adcode: string;
      callback: string;
      appname: string;
      client: string;
      markers: string;
      pc: string;
      mo: string;
      workerUrl: string;
      pcUrl: string;
      mobileUrl: string;
      defaultTileUrl: string;
      copyright: string;
    };

    /**
     * @public
     */
    type GLCustomInitFunc = (gl: WebGLRenderingContext) => void;

    /**
     * @public
     */
    class GLCustomLayer extends Layer {
      CLASS_NAME: string;

      constructor(opts: GlCustomLayerOptions);

      setzIndex(zIndex: number): void;
    }

    /**
     * @public
     */
    interface GlCustomLayerOptions {
      zIndex: number;
      opacity: number;
      visible: boolean;
      zooms: [number, number];
      init: GLCustomInitFunc;
      render: GLCustomRenderFunc;
    }

    /**
     * @public
     */
    type GLCustomRenderFunc = (gl: WebGLRenderingContext, frameState: any, viewState: any, context: any) => void;

    /**
     * @public
     */
    class Heatmap {
      constructor();
    }

    /**
     * @public
     */
    export interface HttpOptions {
      callback?: string;
      type?: string;
      charset?: string;
    }

    /**
     *
     * @public
     * @export
     * @class Icon
     */
    export class Icon {
      CLASS_NAME: string;

      constructor(opts: IconOpts);

      setImageSize(size: Size | Vector2): void;

      getImageSize(): never[] | Size | Vector2;

      setSize(size: Size | Vector2): void;

      getSize(): number[] | Size | Vector2 | undefined;

      setImageOffset(offset: Pixel | Vector2): void;

      getImageOffset(): [number, number] | Pixel;

      getImage(): string;

      setImage(image: string): void;

      getOriginSize(): [] | Vector2;

      setOriginSize(size: Size | Vector2): void;
    }

    /**
     * @public
     */
    export interface IconOpts {
      size?: Size | Vector2 | number[];
      imageOffset?: Pixel | Vector2;
      image: string;
      imageSize?: Size | Vector2;
    }

    /**
     * @public
     */
    export interface IGeometryUtil {
      /**
       * 计算两个经纬度点之间的实际距离。单位：米
       *
       * @param {LngLatLike} p1
       * @param {LngLatLike} p2
       * @returns {number}
       * @memberof GeometryUtil
       */
      distance(p1: LngLatLike, p2: LngLatLike): number;
      /**
       * 计算一个经纬度路径围成区域的实际面积。单位：平米
       *
       * @param {LngLatLike[]} ring
       * @returns {number}
       * @memberof GeometryUtil
       */
      ringArea(ring: LngLatLike[]): number;
      /**
       * 判断一个经纬度路径是否为顺时针
       *
       * @param {LngLatLike[]} ring
       * @returns {boolean}
       * @memberof GeometryUtil
       */
      isClockwise(ring: LngLatLike[]): boolean;
      /**
       * 判断一个经纬度路径面类型
       *
       * @param {LngLatLike[]} ring
       * @returns {boolean}
       * @memberof GeometryUtil
       */
      typePolygon(polygon: LngLatLike[]): string | undefined;
      /**
       * 计算一个经纬度路径的实际长度。单位：米
       *
       * @param {LngLatLike[]} ring
       * @returns {number}
       * @memberof GeometryUtil
       */
      distanceOfLine(ring: LngLatLike[]): number;
      /**
       * 计算两个经纬度面的交叉区域
       *
       * @param {LngLatLike[]} ring1
       * @param {LngLatLike[]} ring2
       * @returns {Array<[number,number]>} 交叉区域
       * @memberof GeometryUtil
       */
      ringRingClip(ring1: LngLatLike[], ring2: LngLatLike[]): Array<[number, number]>;
      /**
       * 判断两个经纬度面是否交叉
       *
       * @param {LngLatLike[]} ring1
       * @param {LngLatLike[]} ring2
       * @returns {boolean}
       * @memberof GeometryUtil
       */
      doesRingRingIntersect(ring1: LngLatLike[], ring2: LngLatLike[]): boolean;
      /**
       * 判断经纬度路径和经纬度面是否交叉
       *
       * @param {LngLatLike[]} line
       * @param {LngLatLike[]} ring
       * @returns {boolean}
       * @memberof GeometryUtil
       */
      doesLineRingIntersect(line: LngLatLike[], ring: LngLatLike[]): boolean;
      /**
       * 判断两个经纬度路径是否相交
       *
       * @param {LngLatLike[]} line
       * @param {LngLatLike[]} line
       * @memberof GeometryUtil
       */
      doesLineLineIntersect(line1: LngLatLike[], line2: LngLatLike[]): boolean;
      /**
       * 判断线段和多个环是否相交
       *
       * @param {LngLatLike} p1
       * @param {LngLatLike} p2
       * @param {LngLatLike[][]} rings
       * @memberof GeometryUtil
       */
      doesSegmentPolygonIntersect(p1: LngLatLike, p2: LngLatLike, rings: LngLatLike[][]): boolean;
      /**
       *
       * 判断线段和一个环是否相交
       * @param {LngLatLike} p1
       * @param {LngLatLike} p2
       * @param {LngLatLike[]} ring
       * @memberof GeometryUtil
       */
      doesSegmentRingIntersect(p1: LngLatLike, p2: LngLatLike, ring: LngLatLike[]): boolean;
      /**
       * 判断线段和一个路径是否相交
       *
       * @param {LngLatLike} p1
       * @param {LngLatLike} p2
       * @param {LngLatLike[]} line
       * @memberof GeometryUtil
       */
      doesSegmentLineIntersect(p1: LngLatLike, p2: LngLatLike, line: LngLatLike[]): boolean;
      /**
       * 判断两个线段是否相交
       *
       * @param {LngLatLike} p1
       * @param {LngLatLike} p2
       * @param {LngLatLike} p3
       * @param {LngLatLike} p4
       * @memberof GeometryUtil
       */
      doesSegmentsIntersect(p1: LngLatLike, p2: LngLatLike, p3: LngLatLike, p4: LngLatLike): boolean;
      /**
       * 判断点是否在环内
       *
       * @param {any} p
       * @param {any[]} ring
       * @memberof GeometryUtil
       */
      pointInRing(pt: [number, number], ring: any[], ignoreBoundary?: boolean): boolean;
      /**
       * 判断点是否在环内
       *
       * @param {LngLatLike} p
       * @param {LngLatLike[]} ring
       * @memberof GeometryUtil
       */
      isPointInRing(p: LngLatLike, ring: LngLatLike[]): boolean;
      /**
       * 判断环是否在另一个环内
       *
       * @param {LngLatLike[]} ring1
       * @param {LngLatLike[]} ring2
       * @returns {boolean}
       * @memberof GeometryUtil
       */
      isRingInRing(ring1: LngLatLike[], ring2: LngLatLike[]): boolean;
      /**
       * 判断点是否在多个环组成区域内
       *
       * @param {LngLatLike} p
       * @param {[ringLngLatLike[]]} rings
       * @memberof GeometryUtil
       */
      isPointInPolygon(p: LngLatLike, rings: LngLatLike[][]): boolean;
      /**
       * 将一个路径变为顺时针
       *
       * @param {LngLatLike[]} ring
       * @returns {boolean}
       * @memberof GeometryUtil
       */
      makesureClockwise(ring: LngLatLike[]): boolean;
      /**
       * 将一个路径变为逆时针
       *
       * @param {LngLatLike[]} ring
       * @memberof GeometryUtil
       */
      makesureAntiClockwise(ring: LngLatLike[]): boolean;
      /**
       * 计算P2P3上距离P1最近的点
       *
       * @param {LngLatLike} p1
       * @param {LngLatLike} p2
       * @param {LngLatLike} p3
       * @memberof GeometryUtil
       */
      closestOnSegment(p1: LngLatLike, p2: LngLatLike, p3: LngLatLike): LngLat;
      /**
       * 计算line上距离P最近的点
       *
       * @param {LngLatLike} p
       * @param {LngLatLike[]} line
       * @memberof GeometryUtil
       */
      closestOnLine(p: LngLatLike, line: LngLatLike[]): LngLat;
      /**
       * 计算P2P3到P1的距离。单位：米
       *
       * @param {LngLatLike} p1
       * @param {LngLatLike} p2
       * @param {LngLatLike} p3
       * @returns {LngLat}
       * @memberof GeometryUtil
       */
      distanceToSegment(p1: LngLatLike, p2: LngLatLike, p3: LngLatLike): number;
      /**
       * 计算P到line的距离。单位：米
       *
       *
       * @param {LngLatLike} p
       * @param {LngLatLike[]} line
       * @memberof GeometryUtil
       */
      distanceToLine(p: LngLatLike, line: LngLatLike[]): number;
      /**
       * 判断P1是否在P2P3上，tolerance为误差范围
       *
       * @param {LngLatLike} p1
       * @param {LngLatLike} p2
       * @param {LngLatLike} p3
       * @param {Number} tolerance
       * @memberof GeometryUtil
       */
      isPointOnSegment(p1: LngLatLike, p2: LngLatLike, p3: LngLatLike, tolerance: number): boolean;
      /**
       * 判断P是否在line上，tolerance为误差范围
       *
       * @param {LngLatLike} p
       * @param {LngLatLike[]} line
       * @param {number} tolerance
       * @returns {boolean}
       * @memberof GeometryUtil
       */
      isPointOnLine(p: LngLatLike, line: LngLatLike[], tolerance: number): boolean;
      /**
       * 判断P是否在ring的边上，tolerance为误差范围
       *
       * @param {LngLatLike} p
       * @param {LngLatLike[]} ring
       * @param {number} tolerance
       * @returns {boolean}
       * @memberof GeometryUtil
       */
      isPointOnRing(p: LngLatLike, ring: LngLatLike[], tolerance: number): boolean;
      /**
       * 判断P是否在多个ring的边上，tolerance为误差范围
       *
       * @param {LngLatLike} p
       * @param {LngLatLike[][]} rings
       * @param {number} tolerance
       * @returns {boolean}
       * @memberof GeometryUtil
       */
      isPointOnPolygon(p: LngLatLike, rings: LngLatLike[][], tolerance: number): boolean;
    }

    /**
     * 图片图层类，用户可以将一张静态图片作为图层添加在地图上，图片图层会随缩放级别而自适应缩放。 </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/selflayer/imagelayer/)
     * @param {ImageLayerOptions} opts 传入默认参数列表
     * @param {String} opts.url 图片地址链接
     * @param {[Number,Number]} [opts.zooms=[2,20]] 图层缩放等级范围，默认 [2, 20]
     * @param {[Number,Number,Number,Number]|Bounds} opts.bounds 图片的范围大小经纬度，如果传递数字数组类型: [minlng,minlat,maxlng,maxlat]
     * @param {Number} [opts.opacity=1] 图层透明度，默认为 1
     * @param {Boolean} [opts.visible=true] 图层是否可见，默认为 true
     * @param {Number} [opts.zIndex=6] 图层的层级，默认为 6
     * @export
     * @example
     * var imageLayer = new AMap.ImageLayer({
     *      url: 'https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg',
     *      bounds: new AMap.Bounds(
     *          [116.327911, 39.939229],
     *          [116.342659, 39.946275]
     *      ),
     *      zooms: [10, 18]
     *  });
     * @class ImageLayer
     * @extends {Layer}
     * @public
     */
    export class ImageLayer extends CoreImageLayer {
      constructor(opts?: ImageLayerOptions);

      /**
       * 获取图片的地址
       * @name getImageUrl
       * @function
       * @instance
       * @memberof ImageLayer
       * @returns
       */
      getImageUrl(): string;

      /**
       * 设置图片的地址
       * @name setImageUrl
       * @function
       * @param {String} url 图片地址
       * @instance
       * @memberof ImageLayer
       */
      setImageUrl(url: string): void;

      /**
       * 获取 ImageLayer显示的范围
       * @name getBounds
       * @function
       * @instance
       * @memberof ImageLayer
       * @returns {Bounds} 经纬度范围值
       */
      getBounds(): number[] | Bounds;

      /**
       * 设置 ImageLayer显示的范围
       * @name setBounds
       * @function
       * @instance
       * @memberof ImageLayer
       */
      setBounds(bounds: Bounds): void;
    }

    /**
     * @public
     */
    export interface ImageLayerOptions {
      zooms?: [number, number];
      url: string;
      bounds: [number, number, number, number];
      opacity?: number;
      visible?: boolean;

      zIndex?: number;
    }

    /**
     * @public
     * @private
     */
    class IndoorLayer extends Layer {
      CLASS_NAME: string;

      constructor(opts: any);

      _hideLayer(state: boolean): void;
    }

    /**
     * 室内图层，用于在适当级别展示室内地图，并提供显示商铺tip、切换楼层等功能。
     *
     * @public
     * @class IndoorMap
     * @example
     * 用法一：创建独立的室内图层
     * var indoorMap = new AMap.IndoorMap({
     *  zIndex: 1000, // 设置室内图层叠加顺序
     *  opacity: 1, // 设置室内图层透明度
     * });
     * var map = new AMap.Map('mapDiv', {
     *  showIndoorMap: false, //隐藏地图默认的室内地图图层
     *  layers: [indoorMap, AMap.createDefaultLayer()] // 添加室内等图层
     * });
     * indoorMap.showIndoorMap('B0FFFAB6J2'); // 显示指定 POI 室内信息
     *
     * 用法二：调用默认室内图层
     * var map = new AMap.Map('mapDiv',{
     *  showIndoorMap: true, //显示地图默认的室内地图图层
     * });
     * map.on('indoor_create',function(){
     *  map.indoorMap.showIndoorMap('B000A8VT15',4); // 显示指定 POI 室内信息
     * })
     * @param {IndoorMapOptions} opts
     * @param {Number} opts.zIndex 室内图层叠加的顺序值
     * @param {Number} opts.opacity 图层的透明度，取值范围[0,1]
     * @param {String} opts.cursor 指定鼠标悬停到店铺面时的鼠标样式
     * @param {Boolean} opts.hideFloorBar 是否隐藏楼层切换控件，默认值：false
     *
     */
    export class IndoorMap extends IndoorLayer {
      CLASS_NAME: string;

      constructor(opts: IndoorMapOptions);

      /**
       * 显示指定 POI 的室内地图
       * @name showIndoorMap
       * @function
       * @param {String} indoorid 建筑物 POIID (必填) [如何获取](https://lbs.amap.com/faq/js-api/map-js-api/layer/43601?_=1585657744106)
       * @param {Number} floor 楼层
       * @param {String} shopid 商铺 ID
       * @memberof IndoorMap
       * @instance
       */
      showIndoorMap(indoorId: string, floor?: number, shopId?: string): void;

      /**
       * 显示指定的楼层
       * @name showFloor
       * @function
       * @param {number} floor 楼层
       * @memberof IndoorMap
       * @instance
       */
      showFloor(floor: number, noMove: boolean): void;

      /**
       * 显示室内地图
       * @name show
       * @function
       * @memberof IndoorMap
       * @instance
       */
      show(): void;

      /**
       * 隐藏室内地图
       * @name hide
       * @function
       * @memberof IndoorMap
       * @instance
       */
      hide(): void;

      getMap(): any;

      /**
       * 	设置显示室内图层的地图对象
       * @name setMap
       * @function
       * @param {Map} map
       * @memberof IndoorMap
       * @instance
       */
      setMap(map: any): void;

      /**
       * 	设置室内地图的显示顺序
       * @name setzIndex
       * @function
       * @param {number} index
       * @memberof IndoorMap
       * @instance
       */
      setzIndex(index: number): void;

      /**
       * 	显示楼层切换控件
       * @name showFloorBar
       * @function
       * @memberof IndoorMap
       * @instance
       */
      showFloorBar(): void;

      /**
       * 	隐藏楼层切换控件
       * @name hideFloorBar
       * @function
       * @memberof IndoorMap
       * @instance
       */
      hideFloorBar(): void;

      /**
       * 设置室内图层透明度
       * @name setOpacity
       * @function
       * @param {number} opacity
       * @memberof IndoorMap
       * @instance
       */
      setOpacity(opacity: number): void;

      /**
       * 获取室内图层透明度
       * @name getOpacity
       * @function
       * @return {number}
       * @memberof IndoorMap
       * @instance
       */
      getOpacity(): number;

      /**
       * 显示室内图层上的标注
       * @name showLabels
       * @function
       * @memberof IndoorMap
       * @instance
       */
      showLabels(): void;

      /**
       * 隐藏室内图层上的标注
       * @name hideLabels
       * @function
       * @memberof IndoorMap
       * @instance
       */
      hideLabels(): void;

      /**
       * 获取被选中室内的 POIID
       * @name getSelectedBuildingId
       * @function
       * @memberof IndoorMap
       * @instance
       */
      getSelectedBuildingId(): any;

      /**
       * 获取被选中的室内地图的一些基本信息，包含名称、当前楼层、所有楼层信息、POIID等
       * @name getSelectedBuilding
       * @function
       * @memberof IndoorMap
       * @instance
       */
      getSelectedBuilding(): any;
    }

    /**
     * @public
     */
    export interface IndoorMapOptions {
      zIndex?: number;
      opacity?: number;
      cursor?: string;
      hideFloorBar?: boolean;
    }

    /**
     * @public
     * @export
     * @interface InfoOptions
     */
    export interface InfoOptions extends OverlayOptions {
      isCustom?: boolean;
      closeWhenClickMap?: boolean;
      autoMove?: boolean;
      avoid?: number[];
    }

    /**
     * 信息窗体，地图仅可同时展示一个信息窗体，推荐为信息窗体通过样式显示设置尺寸。 * // [亲手试一试](https://lbs.amap.com/api/jsapi-v2/example/infowindow/default-style-infowindow)
     *
     * @public
     * @export
     * @class InfoWindow
     * @name InfoWindow
     * @extends {OverlayDOM}
     * @param {InfoOptions} opts 信息窗体参数
     * @param {boolean} opts.isCustom 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）
     * @param {boolean} opts.autoMove 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
     * @param {number[]} opts.avoid autoMove 为 true 时，自动平移到视野内后的上右下左的避让宽度。默认值：[20, 20, 20, 20]
     * @param {boolean} opts.closeWhenClickMap 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体
     * @param {String|HTMLElement} opts.content 显示内容，可以是HTML要素字符串或者HTMLElement对象, [自定义窗体示例](https://lbs.amap.com/api/jsapi-v2/example/infowindow/custom-style-infowindow)
     * @param {Size} opts.size 信息窗体尺寸（isCustom为true时，该属性无效）
     * @param {string} opts.anchor 信息窗体锚点。默认值：'bottom-center'。可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
     * @param {Vector|Pixel} opts.offset 信息窗体显示位置偏移量。默认基准点为信息窗体的底部中心。默认值: [0, 0]
     * @param {Vector|LngLat} opts.position 信息窗体显示基点位置
     * @example
     * var infoWindow = new AMap.InfoWindow({
     *    content: '信息窗体',
     *    anchor: 'bottom-center',
     * });
     * // 在地图上打开信息窗体
     * infoWindow.open(map, [116.397389,39.909466]);
     */
    export class InfoWindow extends OverlayDOM {
      type: string;

      constructor(opts?: InfoOptions);

      /**
       * 打开信息窗体
       * @name open
       * @param {Map} map
       * @param {Vector2} position
       * @param {number} height
       * @memberof InfoWindow
       * @instance
       * @function
       */
      open(map: Map_2, position: Vector2, height?: number): void;

      /**
       * 关闭信息窗体
       * @memberof InfoWindow
       * @instance
       * @function
       */
      close(): void;

      /**
       * 获取信息窗体是否打开
       * @name getIsOpen
       * @returns {boolean}
       * @memberof InfoWindow
       * @instance
       * @function
       */
      getIsOpen(): boolean;

      /**
       * 设置信息窗体大小（isCustom为false时有效）
       * @name setSize
       * @param {Size | Vector2} size
       * @memberof InfoWindow
       * @instance
       * @function
       */
      setSize(size: Size | Vector2): void;

      /**
       * 获取信息窗体大小
       * @name setContent
       * @param {HTMLElement | string} content
       * @memberof InfoWindow
       * @instance
       * @function
       */
      setContent(content?: HTMLElement | string): void;

      /**
       * 设置信息窗体锚点 默认值：'bottom-center'。可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
       * @name setAnchor
       * @param {string} anchor
       * @memberof InfoWindow
       * @instance
       * @function
       */
      setAnchor(anchor: string): void;

      /**
       * @private
       */
      getBounds(): null;
    }

    /**
     * @public
     * @private
     */
    interface IVectorOverlay {
      hide(): void;
      show(): void;
      setOptions(arg: any): void;
    }

    /**
     * 标注类
     *
     * @public
     * @export
     * @class LabelMarker
     * @param {LabelMarkerOptions} opts 标注参数
     * @param {string} opts.name 标注名称，作为标注标识，并非最终在地图上显示的文字内容，显示文字内容请设置 opts.text.content
     * @param {Vector2 | LngLat} opts.position 标注位置
     * @param {Vector2} opts.zooms 标注显示级别范围， 可选值：[2,20]
     * @param {number} opts.opacity 标注透明度，默认值: 1
     * @param {number} opts.rank 避让优先级，获取标注的优先级，该优先级用于 labelsLayer 支持避让时，rank 值大的标注会避让掉 rank 值低的标注。默认值：1
     * @param {number} opts.zIndex 同一 LabelsLayer 内标注显示层级，数字越大越靠前，默认值: 1
     * @param {boolean} opts.visible 标注是否可见， 默认值: true
     * @param {any} opts.extData 用户自定义类型数据，可将自定义数据保存在该属性上，方便后续操作使用。
     * @param {IconOptions} opts.icon 标注图标设置
     * @param {string} opts.icon.image 图标 url。
     * @param {Vector2 | Size} opts.icon.size 图标大小，默认值：[36, 36]
     * @param {Vector2 | Pixel} opts.icon.clipOrigin 图标所在图片偏移位置，默认值: [0, 0]
     * @param {Vector2 | Size} opts.icon.clipSize 图标所在图片裁剪大小，若未设置，则使用图片大小
     * @param {Vector2 | Pixel | string} opts.icon.anchor 图标锚点，锚点位置对应设置的 position 位置。可选值：'top-left'| 'top-center'|'top-right'|'middle-left'|'center'| 'middle-right'| 'bottom-left'| 'bottom-center'| 'bottom-right' 。默认值：'top-left'。
     * @param {TextOptions} opts.text 标注文本设置
     * @param {string} opts.text.content 文本标注的内容，该属性为直接显示在标注上的文本内容。
     * @param {string} opts.text.direction 文本标注方位。若设置了 icon，则 direction 是以 icon 为中心的偏移，若未设置 icon，则相对 position 偏移。
     * 可选值：'top'|'right'|'bottom'|'left'|'center'。默认值: right
     * @param {Pixel | Vector2} opts.text.offset 为偏移量，在 direction 基础上的偏移。默认值[0, 0]
     * @param {Vector2} opts.text.zooms 文本显示级别范围，可单独设置文本显示范围
     * @param {TextStyleOptions} opts.text.style 文本样式设置
     * @param {number} opts.text.style.fontSize 文字大小，默认值： 12
     * @param {string} opts.text.style.fillColor 文字颜色
     * @param {string} opts.text.style.strokeColor 文字描边颜色
     * @param {string | Array<string | number>} opts.text.style.padding 文字 padding。默认值：[3, 3, 3, 3]
     * @param {string} opts.text.style.backgroundColor 文字背景颜色
     * @param {string} opts.text.style.borderColor 文字背景描边颜色
     * @param {number} opts.text.style.borderWidth 文字背景描边粗细
     * @param {boolean} opts.text.style.fold 文字是否折行（6个字一折行）
     * @example
     * // 创建一个 LabelMarker 实例
     * var labelMarker = new AMap.LabelMarker({
     *     position: [116.468599, 39.995847],
     *     opacity: 1,
     *     zIndex: 2,
     *     icon: {
     *         image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
     *         anchor: 'bottom-center',
     *         size: [25, 34],
     *         clipOrigin: [459, 92],
     *         clipSize: [50, 68]
     *     },
     *     text: {
     *         content: '香猪坊',
     *         direction: 'right',
     *         style: {
     *             fontSize: 15,
     *             fillColor: '#fff',
     *             strokeColor: 'rgba(255,0,0,0.5)',
     *             strokeWidth: 2,
     *             padding: [3, 10],
     *             backgroundColor: 'yellow',
     *             borderColor: '#ccc',
     *             borderWidth: 3,
     *         }
     *     }
     * });
     * // 创建一个 LabelsLayer 实例来承载 LabelMarker，[LabelsLayer 文档](https://lbs.amap.com/api/jsapi-v2/documentation#labelslayer)
     * var labelsLayer = new LabelsLayer({
     *     collision: true,
     * });
     * // 将 LabelMarker 实例添加到 LabelsLayer 上
     * labelsLayer.add(labelMarker);
     * // 将 LabelsLayer 添加到地图上
     * map.add(labelsLayer);
     */
    export class LabelMarker extends Overlay {
      constructor(opts: LabelMarkerOptions);

      _mergeOptions(opts: any): any;

      /**
       * 获取标注的名称，作为标注标识，并非最终在地图上显示的文字内容
       * @name getName
       * @returns {string | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getName(): string | undefined;

      /**
       * 设置标注的名称，作为标注标识，并非最终在地图上显示的文字内容
       * @name setName
       * @param {string} name
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setName(name: string): void;

      /**
       * 获取标注的位置范围对象
       * @name getBounds
       * @returns {Bounds}
       * @memberof LabelMarker
       * @instance
       * @function
       * @private
       */
      getBounds(): Bounds;

      /**
       * 获取标注的显示位置
       * @name getPosition
       * @returns {LngLat}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getPosition(): LngLat;

      /**
       * 设置标注的位置
       * @name setPosition
       * @param {LngLat | [number] | string} position
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setPosition(position: LngLat | [number, number] | string): void;

      /**
       * 获取标注显示级别范围
       * @name getZooms
       * @returns {Vector2 | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getZooms(): Vector2 | undefined;

      /**
       * 设置显示级别范围
       * @name setZooms
       * @param {[number]} zooms
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setZooms(zooms?: [number, number]): void;

      /**
       * 获取标注透明度值
       * @name getOpacity
       * @returns {number | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getOpacity(): number | undefined;

      /**
       * 设置标注透明度
       * @name setOpacity
       * @param {number} opacity
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setOpacity(opacity: number): void;

      /**
       * 获取标注的叠加顺序
       * @name getzIndex
       * @returns {number | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getzIndex(): number | undefined;

      /**
       * 设置标注的叠加顺序
       * @name setzIndex
       * @param {number} zIndex
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setzIndex(zIndex: number): void;

      /**
       * 获取标注的优先级，该优先级用于 labelsLayer 支持避让时，rank 值大的标注会避让掉 rank 值低的标注。
       * @name getRank
       * @returns {number | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getRank(): number | undefined;

      /**
       * 设置标注的优先级，该优先级用于 labelsLayer 支持避让时，rank 值大的标注会避让掉 rank 值低的标注。
       * @name setRank
       * @param {number} rank
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setRank(rank: number): void;

      /**
       * 获取标注的文本设置
       * @name getText
       * @returns {LabelMarkerTextOptions | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getText(): LabelMarkerTextOptions | null;

      /**
       * 设置标注的文本设置，可设置显示的文字内容和文字样式等
       * @name setText
       * @param {LabelMarkerTextOptions} textOpts
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setText(textOpts: LabelMarkerTextOptions): void;

      /**
       * 获取标注的图标设置
       * @name getIcon
       * @returns {LabelMarkerIconOptions | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getIcon(): LabelMarkerIconOptions | null;

      /**
       * 设置标注的图标设置，可设置显示的标注图片
       * @name setIcon
       * @param {LabelMarkerIconOptions} iconOpts
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setIcon(iconOpts: LabelMarkerIconOptions): void;

      /**
       * 获取标注的全部属性配置
       * @name getOptions
       * @returns {LabelMarkerOptions}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getOptions(): LabelMarkerOptions;

      /**
       * 获取点标注对象是否可拖拽移动
       * @name getDraggable
       * @returns {boolean}
       * @instance
       * @function
       * @private
       */
      getDraggable(): boolean;

      /**
       * 获取用户自定义属性
       * @name getExtData
       * @returns {any | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getExtData(): any;

      /**
       * 设置用户自定义属性
       * @name setExtData
       * @param extData
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setExtData(extData: any): void;

      /**
       * 是否设置置顶标注，设置为 true 表示该标注会显示在所有标注之前
       * @name setTop
       * @param {boolean} isTop
       * @memberof LabelMarker
       * @instance
       * @function
       */
      setTop(isTop?: boolean): void;

      /**
       * 设置鼠标悬停时的光标
       * @name setCursor
       * @param {string} cursor
       * @memberof LabelMarker
       * @instance
       * @function
       * @private
       */
      setCursor(cursor: string): void;

      /**
       * 获取鼠标悬停时的光标
       * @name getCursor
       * @returns {string | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       * @private
       */
      getCursor(): string;

      /**
       * 获取该标注的可见性
       * @name getVisible
       * @returns {boolean | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getVisible(): boolean;

      /**
       * 获取该标注是否被避让，从而没有显示
       * @name getCollision
       * @returns {boolean | undefined}
       * @memberof LabelMarker
       * @instance
       * @function
       */
      getCollision(): boolean;

      /**
       * 标注显示
       * @name show
       * @memberof LabelMarker
       * @instance
       * @function
       */
      show(): void;

      /**
       * 标注隐藏
       * @name hide
       * @memberof LabelMarker
       * @instance
       * @function
       */
      hide(): void;

      /**
       * 将自身从标注层移除
       * @name remove
       * @memberof LabelMarker
       * @instance
       * @function
       */
      remove(): void;
    }

    /**
     * @public
     */
    export interface LabelMarkerIconOptions {
      image: string;
      size?: Vector2 | Size;
      clipOrigin?: Vector2 | Pixel;
      clipSize?: Vector2 | Size;
      anchor?: Vector2 | Pixel | string;
      retina?: boolean;
    }

    /**
     * @public
     */
    export interface LabelMarkerOptions {
      name?: string;
      position: Vector2 | LngLat;
      zooms?: Vector2;
      opacity?: number;
      rank?: number;
      zIndex?: number;
      visible?: boolean;
      cursor?: string;
      icon?: LabelMarkerIconOptions;
      text?: LabelMarkerTextOptions;
      extData?: any;
      innerOverlay?: boolean;
    }

    /**
     * @public
     */
    export interface LabelMarkerTextOptions {
      content: string;
      direction?: string;
      offset?: Vector2 | Pixel;
      zooms?: Vector2;
      style?: TextStyleOptions;
    }

    /**
     * @public
     */
    interface LabelOptions {
      content: string;
      offset: Pixel | Vector2 | number[];
      direction: string;
      _needUpdate?: boolean;
    }

    /**
     * @public
     * @private
     */
    export class LabelsLayer extends Layer {
      CLASS_NAME: string;

      constructor(opts?: LabelsLayerOptions);

      onRemove(): void;

      /**
       * 根据 id 判断标注是否被避让掉了
       * @returns {boolean} true 被避让掉了 / false 没有被避让
       */
      getLabelCollision(id: number): boolean;
    }

    /**
     * 标注层参数配置
     * @typedef {object} LabelsLayerOptions@typedef {object} LabelsLayerOptions
     * @property {boolean} visible 标注层是否可见
     * @property {number} zIndex 标注层叠加顺序
     * @property {number} opacity 标注层透明度
     * @property {boolean} collision 标注层内的标注是否避让
     * @property {boolean} allowCollision 标注层内的标注是否允许其它标注层对它避让
     * @property {[number,number]} zooms 标注层展示层级范围
     * @private
     */
    /**
     * 标注层
     *
     * @public
     * @export
     * @class LabelsLayer
     * @param {LabelsLayerOptions} opts 标注层参数
     * @param {boolean} opts.visible 标注层是否可见，默认值:true
     * @param {number} opts.zIndex 标注层与其它图层的叠加顺序，默认值：120
     * @param {number} opts.opacity 标注层透明度
     * @param {boolean} opts.collision 标注层内的标注是否避让
     * @param {boolean} opts.allowCollision 标注层内的标注是否允许其它标注层对它避让
     * @param {[number,number]} opts.zooms 标注层展示层级范围
     * @example
     * // 创建一个标注层实例
     * var labelsLayer = new AMap.LabelsLayer({
     *      collision: true,
     *      opacity: 1,
     *      zIndex: 120,
     *      allowCollision: true,
     * });
     * // 将标注层添加到地图上
     * map.add(labelsLayer);
     */
    class LabelsLayer_2 extends LabelsLayer {
      constructor(opts?: LabelsLayerOptions);

      /**
       * 获取标注层是否支持内部标注避让
       * @name getCollision
       * @returns {any}
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      getCollision(): any;

      /**
       * 设置标注层是否支持内部标注避让
       * @name setCollision
       * @param {boolean} collision 默认值: true
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      setCollision(collision?: boolean): void;

      /**
       * 获取标注层是否允许其它层标注避让
       * @name getAllowCollision
       * @returns {boolean}
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      getAllowCollision(): any;

      /**
       * 设置标注层是否允许其它层标注避让，开启该功能可实现地图标注对 LabelMarker 的避让，[相关示例](https://lbs.amap.com/api/jsapi-v2/example/marker/labelsmarker)
       * @name setAllowCollision
       * @param {boolean} allowCollision
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      setAllowCollision(allowCollision?: boolean): void;

      /**
       * 获取标注层透明度
       * @name getOpacity
       * @returns {number}
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      getOpacity(): any;

      /**
       * 设置标注层透明度
       * @name setOpacity
       * @param {number} opacity
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      setOpacity(opacity: number): void;

      /**
       * 获取标注层显示层级范围
       * @name getZooms
       * @returns {any}
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      getZooms(): any;

      /**
       * 设置标注层显示层级范围
       * @name setZooms
       * @param {[number]} zooms
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      setZooms(zooms: [number, number]): void;

      /**
       * 获取标注层叠加顺序
       * @name getzIndex
       * @returns {number}
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      getzIndex(): any;

      /**
       * 设置标注层叠加顺序
       * @name setzIndex
       * @param {number} zIndex
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      setzIndex(zIndex: number): void;

      /**
       * 将 labelMarker 添加到标注层上
       * @name add
       * @param {LabelMarker[]} labelMarkers 可添加单个标注或标注数组
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      add(labelMarkers: LabelMarker[]): void;

      /**
       * 将 labelMarker 从标注层上移除
       * @name remove
       * @param {LabelMarker | LabelMarker[]} labelMarkers 可移除单个标注或标注数组
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      remove(labelMarkers: LabelMarker | LabelMarker[]): void;

      /**
       * 清空标注层上的标注
       * @name clear
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      clear(): void;

      /**
       * 显示标注层
       * @name show
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      show(): void;

      /**
       * 隐藏标注层
       * @name hide
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      hide(): void;

      /**
       * 获取标注层内的所有标注对象
       * @name getAllOverlays
       * @returns {any[]}
       * @memberof LabelsLayer
       * @instance
       * @function
       */
      getAllOverlays(): LabelMarker[];
    }

    /**
     * @public
     */
    export interface LabelsLayerOptions {
      visible?: boolean;
      zIndex?: number;
      opacity?: number;
      collision?: boolean;

      allowCollision?: boolean;

      zooms?: [number, number];
    }

    /**
     * @public
     * @private
     */
    abstract class Layer extends Event {
      CLASS_NAME: string;

      _zIndex: number;

      _opts: any;

      constructor(opts?: any);

      /**
       * 添加到地图上
       * @instance
       * @name setMap
       * @param {Map} 地图实例对象
       * @memberof Layer
       */
      setMap(map: Map_2 | null): void;

      /**
       * 设置图层层级，数字越大图层层级越高
       * @name setzIndex
       * @param {number} zIndex 图层层级值
       * @instance
       * @memberof Layer
       */
      setzIndex(z: number): void;

      /**
       * 设置图层透明度，范围 [0 ~ 1]
       * @name setOpacity
       * @param {number} opacity 图层透明度
       * @instance
       * @memberof Layer
       */
      setOpacity(opacity: number): void;

      /**
       * 获取图层透明度
       * @name getOpacity
       * @instance
       * @memberof Layer
       * @return {number} opacity 图层透明度
       */
      getOpacity(): number;

      /**
       * 获取图层层级
       * @name getzIndex
       * @instance
       * @memberof Layer
       * @return {number} zIndex 图层层级
       */
      getzIndex(): number;

      /**
       * 获取图层参数信息
       * @name getOptions
       * @instance
       * @memberof Layer
       * @return {object} 图层参数信息
       */
      getOptions(): any;

      /**
       * 获取图层可见缩放范围
       * @name getZooms
       * @instance
       * @memberof Layer
       * @return {[number,number]} 缩放范围
       */
      getZooms(): [number, number];

      /**
       * 设置图层可见缩放范围
       * @name setZooms
       * @param {[number,number]} zooms 缩放范围
       * @instance
       * @memberof Layer
       */
      setZooms(zooms: [number, number]): void;

      getVisible(): boolean;

      /**
       * 设置图层可见
       * @name show
       * @instance
       * @memberof Layer
       */
      show(): void;

      /**
       * 设置图层隐藏
       * @name hide
       * @instance
       * @memberof Layer
       */
      hide(): void;

      /**
       * 销毁图层
       * @name destroy
       * @instance
       * @memberof Layer
       * @private
       */
      destroy(): void;
    }

    /**
     * LayerGroup类用来包装其它图层类的实例， 对实例集合做批量操作， 避免开发者对多个需要设置同样属性的图层实例做循环处理。</br>
     * 同时只要对LayerGroup执行过setMap方法后， 新添加到该LayerGroup中的图层会自动将其map属性修改到该group对应的map，</br>
     * 此外从group中移除该图层时，也会将该图层从group对应的map中移除。</br>
     * 如果对图层集合添加对某个事件的监听或解除监听， 图层集合会对集合中所有图层实例做集合处理， </br>
     * 只要该图层支持此事件， 该事件绑定/解除即对图层生效
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/layer-common/layergroup/)
     *
     * @name LayerGroup
     * @param {Layer[]} layers 图层数组
     * @class LayerGroup
     * @export
     * @public
     */
    export class LayerGroup extends Event {
      constructor(layers?: Layer[]);

      /**
       * 添加到地图上面
       * @name setMap
       * @function
       * @param {Map} map 地图对象
       * @returns
       * @memberof LayerGroup
       * @instance
       */
      setMap(map: Map_2): this;

      /**
       * 判断传入的图层实例是否在集合中
       * @name hasLayer
       * @function
       * @param {Layer} layer
       * @memberof LayerGroup
       * @instance
       */
      hasLayer(layer: Layer): boolean;

      /**
       * 修改图层属性(包括线样式、样色等等)
       *
       * @name setOptions
       * @function
       * @param {LayerOptions} opts 参数
       * @param {Boolean} opts.visible 是否可见
       * @param {Number} opts.opacity 透明度
       * @param {Number} opts.zIndex 层级
       * @param {Number[]} opts.zooms 集合可见范围
       * @returns
       * @memberof LayerGroup
       * @instance
       */
      setOptions(opts: any): this;

      /**
       * 对集合中的图层做迭代操作，其中iterator的函数定义是：</br>
       * function(layer, index, collections)，相关含义如下：</br>
       * layer: 当前迭代到的图层 </br>
       * index: 该图层在集合中的序列号(从0开始) </br>
       * collections: 所有图层实例 </br>
       *
       * @name eachLayer
       * @function
       * @param {Function} iterator
       * @memberof LayerGroup
       * @instance
       */
      eachLayer(callback: any): void;

      /**
       * 添加单个图层到集合中，不支持添加重复的图层
       *
       * @name addLayer
       * @function
       * @param {Layer} layer 图层对象
       * @memberof LayerGroup
       * @instance
       */
      addLayer(layer: Layer): void;

      /**
       * 添加图层数组到集合中，不支持添加重复的图层
       *
       * @name addLayers
       * @function
       * @param {Layer[]} layers 图层数组
       * @memberof LayerGroup
       * @instance
       */
      addLayers(layers: Layer[]): void;

      /**
       * 从集合中删除传入的图层实例
       *
       * @name removeLayer
       * @function
       * @param {Layer} layer 图层对象
       * @memberof LayerGroup
       * @instance
       */
      removeLayer(layer: Layer): Layer;

      /**
       * 从集合中删除传入的图层实例数组
       *
       * @name removeLayers
       * @function
       * @param {Layer[]} layers 图层数组
       * @memberof LayerGroup
       * @instance
       */
      removeLayers(layers: Layer[]): void;

      /**
       * 获取组里所有对象，包括图层和覆盖物
       *
       * @name getLayers
       * @function
       * @returns {Layers[]}
       * @instance
       * @memberof LayerGroup
       */
      getLayers(): any[];

      /**
       * 清空图层
       *
       * @name clearLayers
       * @function
       * @memberof LayerGroup
       * @instance
       */
      clearLayers(): void;

      /**
       * 设置图层隐藏
       * @name hide
       * @function
       * @instance
       * @memberof LayerGroup
       */
      hide(): this;

      /**
       * 设置图层可见
       * @name show
       * @function
       * @instance
       * @memberof LayerGroup
       */
      show(): this;

      /**
       * 事件批量绑定
       *
       * @name on
       * @function
       * @param {String} type 事件名称, 比如: click、mouseover
       * @param {Function} 事件回调函数
       * @instance
       * @memberof LayerGroup
       */
      on(type: string | string[], cb: any): this;

      /**
       * 重新加载图层资源，重新渲染
       *
       * @name reload
       * @function
       * @returns
       * @memberof LayerGroup
       * @instance
       */
      reload(): this;
    }

    /**
     * @public
     */
    interface LayerState {
      opacity: number;
      visible?: boolean;
      layer?: Layer;
      zIndex?: number;
      zooms?: [number, number];
      rejectMapMask?: boolean;
      depthTest?: boolean;
      depthClear?: boolean;
      detectRetina?: boolean;
    }

    /**
     * @public
     */
    type LineCapEndType = 'butt' | 'round' | 'square';

    /**
     * @public
     */
    type LineJoinType = 'miter' | 'bevel' | 'round';

    /**
     * @public
     * @private
     */
    export interface LineSharedOptions {
      zIndex?: number;
      bubble?: boolean;
      cursor?: string;
      strokeColor?: string;
      strokeWeight?: number;
      strokeOpacity?: number;
      strokeStyle?: 'solid' | 'dashed';
      strokeDasharray?: [number, number] | [number, number, number, number];
      borderWeight?: number;
      outlineColor?: string;
      lineJoin?: LineJoinType;
      lineCap?: LineCapEndType;
      draggable?: boolean;
      extData?: any;
      showDir?: boolean;
      geodesic?: boolean;
      isOutline?: boolean;
      dirColor?: string;
      dirImg?: string | HTMLCanvasElement;

      zooms?: [number, number];
    }

    /**
     * 经纬度坐标，用来描述地图上的一个点位置,
     * 目前高德地图使用的是 GCJ-02 坐标，如果你采集的是 WGS84 坐标，请先进行坐标转换
     *
     * @public
     * @export
     * @class LngLat
     * @param {number} lng 经度值
     * @param {number} lat 纬度值
     * @param {boolean} noWrap 是否自动将经度值修正到 [-180,180] 区间内，缺省为false;
     * noWrap 为false时传入[190,30]，会被自动修正为[-170,30],
     * noWrap 为true时不会自动修正，可以用来进行跨日期限的覆盖物绘制
     * @example
     * var lnglat = new AMap.LngLat(116, 39);
     */
    export class LngLat {
      static from(point: LngLatLike): LngLat;

      className: string;

      /**
       * 纬度
       * @name lat
       * @type {number}
       * @memberof LngLat
       * @readonly
       * @instance
       */
      lat: number;

      /**
       * 经度
       * @name lng
       * @type {number}
       * @memberof LngLat
       * @readonly
       * @instance
       */
      lng: number;

      /**
       * 墨卡托坐标
       * @private
       * @type {[number, number]}
       */
      pos: [number, number];

      constructor(lng: number, lat: number, noWrap?: boolean);

      /**
       * 设置经度值
       * @name setLng
       * @param {number} lng 经度
       * @function
       * @memberof LngLat
       * @instance
       */
      setLng(lng: number): this;

      /**
       * 设置纬度值
       * @name setLat
       * @param {number} lat
       * @function
       * @memberof LngLat
       * @instance
       */
      setLat(lat: number): this;

      /**
       * 获取经度值
       * @name getLng
       * @function
       * @return {number}
       * @memberof LngLat
       * @instance
       */
      getLng(): number;

      /**
       * 获取纬度值
       * @name getLat
       * @function
       * @return {number}
       * @memberof LngLat
       * @instance
       */
      getLat(): number;

      /**
       * 判断经纬度坐标和另外一个经纬度坐标是否相等
       * @name equals
       * @function
       * @param {LngLat} another 另外一个经纬度坐标
       * @return {Boolean} 是否相等
       * @memberof LngLat
       * @instance
       */
      equals(another: any): boolean;

      /**
       * 与另外一个经纬度相加
       * @name add
       * @function
       * @param {LngLat} another 另外一个经纬度坐标
       * @param {boolean} noWrap 是否将相加的结果经度值修正到 [-180,180] 区间内
       * @return {LngLat} 两个经纬度相加的结果
       * @memberof LngLat
       * @instance
       */
      add(another: LngLat, noWrap?: boolean): LngLat;

      /**
       * 与另外一个经纬度相减
       * @name subtract
       * @function
       * @param {LngLat} another 另外一个经纬度坐标
       * @param {boolean} noWrap 是否将相减的结果经度值修正到 [-180,180] 区间内
       * @return {LngLat} 两个经纬度相减的结果
       * @memberof LngLat
       * @instance
       */
      subtract(another: LngLat, noWrap?: boolean): LngLat;

      /**
       * @private
       * @param {Number} num
       * @param {Boolean} noWrap
       * @return {module:basetype/AMap.LngLat}
       */
      divideBy(num: number, noWrap?: boolean): LngLat;

      /**
       * @private
       * @param {Number} num
       * @param {Boolean} noWrap
       * @return {module:basetype/AMap.LngLat}
       */
      multiplyBy(num: number, noWrap?: boolean): LngLat;

      /**
       * 获取从当前经纬度位置向东移动 E 米，向北移动 N 米的坐标位置
       * @name offset
       * @function
       * @param {Number} E  经度方向移动，向东为正
       * @param {Number} N  维度方向移动，向北为正
       * @return {LngLat} 移动后的新经纬度
       * @memberof LngLat
       * @instance
       */
      offset(E: number, N: number): LngLat;

      /**
       * LngLat对象以字符串的形式返回
       *
       * @name toString
       * @function
       * @returns {string} 格式如'lng值,lat值'的字符串
       * @memberof LngLat
       * @instance
       */
      toString(): string;

      /**
       * LngLat对象以字符串的形式返回
       *
       * @name toArray
       * @function
       * @returns {string} 格式如'lng值,lat值'的字符串
       * @memberof LngLat
       * @instance
       */
      toArray(): [number, number];

      toJSON(): [number, number];

      distanceTo(another: LngLat): number;

      /**
       * 计算当前经纬度距离另一个经纬度或者经纬度数组组成的路径的距离
       * [相关示例](https://lbs.amap.com/api/javascript-api/example/calcutation/calculate-distance-between-two-markers/)
       * @name distance
       * @function
       * @param {LngLat|<LngLat>} another
       * @returns {number} 距离值，单位为米
       * @memberof LngLat
       * @instance
       */
      distance(another: LngLat): number;
    }

    /**
     * @public
     */
    export type LngLatLike = LngLat | [number, number];

    /**
     * 地图对象类，封装了地图的属性设置、图层变更、事件交互等接口的类。</br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/map-lifecycle/map-show)
     *
     * @public
     * @interface
     * @class Map
     * @export
     * @param {(String | HTMLDivElement)} div 构造一个地图对象，参数container中传入地图容器DIV的ID值或者DIV对象，
     * opts地图初始化参数对象，参数详情参看MapOptions列表。注意：地图容器在创建之前必须拥有实际大小，否则可能出现底图无法渲染的问题。
     * @param {MapOptions} opts 地图初始化参数
     * @param {[Number, Number] | LngLat} opts.center 初始中心经纬度
     * @param {Number} opts.zoom 地图显示的缩放级别，可以设置为浮点数；若center与level未赋值，地图初始化默认显示用户所在城市范围。
     * @param {Number} [opts.rotation=0] 地图顺时针旋转角度，取值范围 [0-360]，默认值：0
     * @param {Number} [opts.pitch=0] 俯仰角度，默认 0，最大值根据地图当前 zoom 级别不断增大，2D地图下无效 。
     * @param {String} [opts.viewMode='2D'] 地图视图模式, 默认为‘2D’，可选’3D’，选择‘3D’会显示 3D 地图效果。
     * @param {String[]} [opts.features=['bg','point','road','building']] 设置地图上显示的元素种类, 支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）
     * @param {Layer[]} opts.layers 地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图。
     * 当叠加多个[图层](https://lbs.amap.com/api/jsapi-v2/documentation#tilelayer)时，普通二维地图需通过实例化一个TileLayer类实现。
     * 如果你希望创建一个默认底图图层，使用 AMap.createDefaultLayer()
     * @param {[Number, Number]} [opts.zooms=[2,20]] 地图显示的缩放级别范围, 默认为[2, 20]，取值范围[2 ~ 20]
     * @param {Boolean} [opts.dragEnable=true] 地图是否可通过鼠标拖拽平移, 默认为 true。此属性可被 setStatus/getStatus 方法控制
     * @param {Boolean} [opts.zoomEnable=true] 地图是否可缩放，默认值为 true。此属性可被 setStatus/getStatus 方法控制
     * @param {Boolean} [opts.jogEnable=true] 地图是否使用缓动效果，默认值为true。此属性可被setStatus/getStatus 方法控制
     * @param {Boolean} [opts.pitchEnable=true] 是否允许设置俯仰角度, 3D 视图下为 true, 2D 视图下无效。
     * @param {Boolean} [opts.rotateEnable=true] 地图是否可旋转, 图默认为true
     * @param {Boolean} [opts.animateEnable=true] 地图平移过程中是否使用动画（如调用panBy、panTo、setCenter、setZoomAndCenter等函数,
     * 将对地图产生平移操作, 是否使用动画平移的效果）, 默认为true, 即使用动画
     * @param {Boolean} [opts.keyboardEnable=true] 地图是否可通过键盘控制, 默认为true, 方向键控制地图平移，"+"和"-"可以控制地图的缩放,
     * Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转。此属性可被setStatus/getStatus 方法控制
     * @param {Boolean} [opts.doubleClickZoom=true] 地图是否可通过双击鼠标放大地图, 默认为true。此属性可被setStatus/getStatus 方法控制
     * @param {Boolean} [opts.scrollWheel=true] 地图是否可通过鼠标滚轮缩放浏览，默认为true。此属性可被setStatus/getStatus 方法控制
     * @param {Boolean} [opts.touchZoom=true] 地图在移动终端上是否可通过多点触控缩放浏览地图，默认为true。关闭手势缩放地图，请设置为false。
     * @param {Boolean} [opts.touchZoomCenter=1] 可缺省，当touchZoomCenter=1的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心。
     * @param {Boolean} [opts.showLabel=true] 是否展示地图文字和 POI 信息。
     * @param {String} opts.defaultCursor 地图默认鼠标样式。参数 defaultCursor 应符合 CSS 的 cursor 属性规范。
     * @param {Boolean} opts.isHotspot 是否开启地图热点和标注的 hover 效果。PC端默认是true, 移动端默认是 false。
     * @param {String} opts.mapStyle 设置地图的显示样式，目前支持两种地图样式：
     * 第一种：自定义地图样式，如 "amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86"
     * 可前往地图自定义平台定制自己的个性地图样式；
     * 第二种：官方样式模版,如"amap://styles/grey"。
     * 其他模版样式及自定义地图的使用说明见开发指南
     * @param {String|Number[]} opts.wallColor 地图楼块的侧面颜色
     * @param {String|Number[]} opts.roofColor 地图楼块的顶面颜色
     * @param {Boolean} [opts.showBuildingBlock=true] 是否展示地图 3D 楼块，默认 true
     * @param {Boolean} [opts.showIndoorMap=false] 是否自动展示室内地图，默认是 false
     * @param {String|Number[]} opts.skyColor 天空颜色，3D 模式下带有俯仰角时会显示
     * @param {Boolean} [opts.labelRejectMask=false] 文字是否拒绝掩模图层进行掩模
     * @param {Number[]} opts.mask 为 Map 实例指定掩模的路径，各图层将只显示路径范围内图像，3D视图下有效。
     * 格式为一个经纬度的一维、二维或三维数组。 </br> [相关示例](https://lbs.amap.com/api/jsapi-v2/example/3d/mask) </br>
     * 一维数组时代表一个普通多边形路径，如: </br>
     * [lng1,lat1], [lng2,lat2], [lng3,lat3]]
     * 二维数组时代表一个带洞的多边形路径，如: </br>
     * [[lng4,lat4], [lng5,lat5], [lng6,lat6]],
     * [[lng7,lat7], [lng8,lat8], [lng9,lat9]]
     * ]
     * 三维数组时代表多个多边形路径，如: </br>
     * [
     * [[lng1,lat1], [lng2,lat2], [lng3,lat3]], // 一个普通多边形
     * [ //一个带洞多边形
     * [[lng4,lat4], [lng5,lat5], [lng6,lat6]],
     * [[lng7,lat7], [lng8,lat8], [lng9,lat9]]
     * ]
     * ]
     * @example
     * var map = new AMap.Map('map', {
     *   viewMode: '3D',
     *   center: [116.397083, 39.874531],
     *   layers: [AMap.createDefaultLayer()],  // layers 字段为空或者不赋值将会自动创建默认底图。
     *   zoom: 12,
     * })
     *
     */
    class Map_2 extends CoreMap {
      constructor(div: string | HTMLDivElement, opts?: Partial<MapOptions>);

      /**
       * 设置中心点 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/map/change-map-center)
       * @name setCenter
       * @function
       * @param {([number, number] | LngLat)} center 中心点经纬度
       * @param {Boolean} [immediately=false] 是否立即过渡到目标位置
       * @param {Number} [duration] 如果使用动画过度，动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
       * @memberof Map
       * @instance
       */
      setCenter(center: [number, number] | LngLat, immediately?: boolean, duration?: number): void;

      /**
       * 地图缩放至指定级别并以指定点为地图显示中心点 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/map/change-map-center/)
       * @name setZoomAndCenter
       * @function
       * @param {Number} zoom 缩放等级
       * @param {(LngLat | [number, number])} center 地图中心点位置
       * @param {Boolean} [immediately=false] 是否立即过渡到目位置
       * @param {Number} [duration] 如果使用动画过度，动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
       * @memberof Map
       * @instance
       */
      setZoomAndCenter(zoom: number, center: LngLat | [number, number], immediately?: boolean, duration?: number): void;

      /**
       * 获取当前地图视图范围/可视区域。 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/map/map-bounds/)
       * @name getBounds
       * @function
       * @returns {Bounds} 边界经纬度
       * @instance
       * @memberof Map
       */
      getBounds(): Bounds;

      /**
       * 获取地图中心点经纬度坐标值。 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/map/get-mapzoom)
       * @name getCenter
       * @function
       * @instance
       * @memberof Map
       * @returns {LngLat} 地图中心点经纬度
       */
      getCenter(): LngLat;

      /**
       * 设置地图显示的缩放级别，参数 zoom 可设范围：[2, 20]
       *
       * @name setZoom
       * @function
       * @param {Number} zoom 地图缩放等级
       * @param {Boolean} [immediately=false] 是否立即过渡到目标位置
       * @param {Number} [duration] 如果使用动画过度，动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
       * @instance
       * @memberof Map
       * @returns
       */
      setZoom(zoom: number, immediately?: boolean, duration?: number): void;

      /**
       * 获取当前地图缩放级别, 默认取值范围为[2, 20]
       *
       * @name getZoom
       * @function
       * @param {Number} digits zoom级别的小数位精度，缺省为2
       * @returns {Number} 地图缩放等级
       * @instance
       * @memberof Map
       */
      getZoom(digits?: number): number;

      /**
       * 地图放大一级显示
       * @name zoomIn
       * @function
       * @instance
       * @memberof Map
       */
      zoomIn(): void;

      /**
       * 地图缩小一级显示
       * @name zoomOut
       * @function
       * @instance
       * @memberof Map
       */
      zoomOut(): void;

      /**
       * 获取地图当前俯仰角
       *
       * @name getPitch
       * @function
       * @instance
       * @memberof Map
       * @returns {Number} 角度
       */
      getPitch(): number;

      /**
       * 设置地图俯仰角
       *
       * @name setPitch
       * @function
       * @param {Number} Pitch 角度
       * @param {Boolean} [immediately=false] 是否立即过渡到目标位置
       * @param {Number} [duration] 如果使用动画过度，动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
       * @instance
       * @memberof Map
       * @returns
       */
      setPitch(pitch: number, immediately?: boolean, duration?: number): void;

      /**
       * 获取地图顺时针旋转角度, 范围: [0 ~ 360]
       *
       * @name getRotation
       * @function
       * @instance
       * @memberof Map
       * @returns {Number} 旋转角度值
       */
      getRotation(): number;

      /**
       * 设置地图顺时针旋转角度, 旋转原点为地图容器中心点, 取值范围: [0 ~ 360]
       *
       * @name setRotation
       * @function
       * @param {Number} rotation 旋转角度
       * @param {Boolean} [immediately=false] 是否立即过渡到目标位置
       * @param {Number} [duration] 动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
       * @instance
       * @memberof Map
       * @returns
       */
      setRotation(rotation?: number, immediately?: boolean, duration?: number): void;

      /**
       * 指定当前地图显示范围，参数 bounds 为指定的范围
       *
       * @name setBounds
       * @function
       * @param {(number[] | Bounds)} bounds 经纬度范围
       * @param {boolean} [immediately=false] 立即缩放到指定位置
       * @param {number[]} [avoid=[0,0,0,0]] 距离边框的内边距，顺序：上、下、左、右
       * @instance
       * @memberof Map
       */
      setBounds(bounds: number[] | Bounds, immediately?: boolean, avoid?: number[]): void;

      /**
       * 地图中心点平移至指定点位置
       *
       * @name panTo
       * @function
       * @param {([number, number] | LngLat)} lnglat
       * @param {Number} [duration] 动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
       * @instance
       * @memberof Map
       */
      panTo(lnglat: [number, number] | LngLat, duration?: number): void;

      /**
       * 以像素为单位, 沿 x 方向和 y 方向移动地图, x 向右为正, y 向下为正
       *
       * @name panBy
       * @function
       * @param {Number} x 横轴方向
       * @param {Number} y 纵轴方向
       * @param {Number} [duration] 如果使用动画过度，动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
       * @instance
       * @memberof Map
       */
      panBy(x: number, y: number, duration?: number): void;

      /**
       * 获取地图对象的容器
       *
       * @name getContainer
       * @private
       * @function
       * @instance
       * @memberof Map
       * @returns {HTMLDivElement} 容器 DOM 对象
       */
      getContainer(): HTMLDivElement;

      /**
       * 添加覆盖物/图层。参数为单个覆盖物/图层，或覆盖物/图层的数组。
       *
       * @name add
       * @function
       * @param {(VectorOverlay | any[])} features 覆盖物对象或者数组
       * @instance
       * @memberof Map
       */
      add(features: Overlay | Layer | Array<Overlay | Layer>): void;

      /**
       * 删除覆盖物/图层。参数为单个覆盖物/图层，或覆盖物/图层的数组。
       *
       * @name remove
       * @function
       * @param {(Overlay | Layer | Array<Overlay | Layer>)} features 覆盖物对象或者数组
       * @instance
       * @memberof Map
       */
      remove(features: Overlay | Layer | Array<Overlay | Layer> | any): void;

      /**
       * 经纬度转莫卡托坐标（单位：米）
       * @name lngLatToCoords
       * @function
       * @param {([number, number] | LngLat)} lnglat 经纬度
       * @returns 莫卡托坐标（单位：米）
       * @instance
       * @memberof Map
       */
      lngLatToCoords(lnglat: [number, number] | LngLat): [number, number];

      /**
       * 莫卡托坐标（单位：米）转经纬度
       * @name coordsToLngLat
       * @function
       * @param {([number, number])} coords 莫卡托坐标（单位：米）
       * @returns 经纬度
       * @instance
       * @memberof Map
       */
      coordsToLngLat(coords: [number, number]): LngLat;

      /**
       * 地图经纬度坐标转为地图容器像素坐标 </br>
       * [相关示例]
       * (https://lbs.amap.com/api/jsapi-v2/example/axis/transformate-between-coordinates-of-lnglat-and-map-container/)
       * @name lngLatToContainer
       * @function
       * @param {number[]|LngLat} lnglat 经纬度
       * @instance
       * @memberof Map
       * @returns {Pixel} 容器像素坐标
       */
      lngLatToContainer(lnglat: number[] | LngLat): Pixel;

      /**
       * 地图容器坐标转换成经纬度 </br>
       * [相关示例]
       * (https://lbs.amap.com/api/jsapi-v2/example/axis/transformate-between-coordinates-of-lnglat-and-map-container/)
       * @name containerToLngLat
       * @function
       * @param {number[]|Pixel} pixel 容器像素坐标
       * @instance
       * @memberof Map
       * @returns {LngLat} 转换成功的经纬度
       */
      containerToLngLat(pixel: number[] | Pixel): LngLat;

      /**
       * 莫卡托（单位：米）转成地图容器坐标
       *
       * @name coordToContainer
       * @function
       * @param {Number[]} coord 莫卡托坐标（单位：米）
       * @instance
       * @memberof Map
       * @returns {Number[]} 容器像素坐标
       */
      coordToContainer(coord: [number, number]): [number, number];

      /**
       * 地图容器坐标转成莫卡托（单位：米）
       *
       * @name containerToCoord
       * @function
       * @param {Number[] | Pixel} pixel 容器像素坐标
       * @instance
       * @memberof Map
       * @returns {Number[]} 莫卡托坐标（单位：米）
       */
      containerToCoord(pixel: number[] | Pixel): number[];

      /**
       * 平面地图像素坐标转换为地图经纬度坐标
       *
       * @name pixelToLngLat
       * @function
       * @param {(number[] | Pixel)} pixel 像素坐标
       * @param {Number} [zoom] 某个地图级别
       * @instance
       * @memberof Map
       * @returns {LngLat}
       */
      pixelToLngLat(pixel: number[] | Pixel, z?: number): LngLat;

      /**
       * 经纬度坐标转换成平面地图像素坐标
       *
       * @name lngLatToPixel
       * @function
       * @param {(number[] | LngLat)} lnglat 经纬度
       * @param {Number} [zoom] 某个地图级别，默认是地图当前级别
       * @instance
       * @memberof Map
       * @returns {Pixel} 转换后的平面像素坐标
       */
      lngLatToPixel(lnglat: number[] | LngLat, z?: number): Pixel;

      /**
       * 获取指定位置的地图分辨率，单位：米/像素。
       * 参数point有指定值时，返回指定点地图分辨率，point缺省时，默认返回当前地图中心点位置的分辨率
       *
       * @name getResolution
       * @function
       * @instance
       * @memberof Map
       * @returns {Number} 分辨率
       */
      getResolution(point?: LngLat): number;

      /**
       * 获取当前地图比例尺。表示当前屏幕距离一米代表实际距离多少米
       *
       * @name getScale
       * @function
       * @param {Number} dpi
       * @instance
       * @memberof Map
       * @returns {Number} 比例尺的值
       */
      getScale(dpi: number): number;

      /**
       * 获取地图中心点所在区域，回调函数返回对象属性分别对应为{省，市，区/县} </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/map/get-current-administrative-region/)
       * @name getCity
       * @function
       * @param {Function} getCityCallBack 查询成功的回调函数
       * @param {Number[]} lnglat 查询的经纬度
       * @instance
       * @memberof Map
       * @returns
       */
      getCity(cbk: (result: any) => void, lnglat: number[]): void;

      /**
       * 按照行政区名称或adcode来设置地图显示的中心点。 </br>
       * 行政区名称支持中国、省、市、区/县名称，如遇重名的情况，会按城市编码表顺序返回第一个。adcode请在城市编码表中查询。 </br>
       * 建议不要同时使用center/setCenter()和setCity()，如一起使用程序将以setCity()作为最后结果。 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/map/set-center-according-to-map-name/)
       * @name setCity
       * @function
       * @param {String} cityName 城市名称
       * @param {((center: number[] | null, zoom: number | null) => void)} cbk 查询成功回调函数
       * @instance
       * @memberof Map
       * @returns
       */
      setCity(cityName: string, cbk: (center: number[] | null, zoom: number | null) => void): void;

      /**
       * 根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别，参数均可缺省。</br>
       * overlayList为覆盖物数组，缺省时为当前地图上添加的所有覆盖物图层，</br>
       * immediately代表是否需要动画过程，avoid代表上下左右的像素避让宽度，maxZoom代表fitView之后的最大级 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/marker/adaptive-show-multiple-markers/)
       * @name setFitView
       * @function
       * @param {Overlay[]} overlays 覆盖物
       * @param {Boolean} [immediately=false] 是否立即过渡
       * @param {Number[]} [avoid=[60, 60, 60, 60]] 四周边距，上、下、左、右
       * @param {Number} [maxZoom=CoreMap.defaultZooms[1]] 最大 zoom 级别
       * @memberof Map
       * @instance
       * @example
       * var map = new AMap.Map({
       *     zoom: 10,
       * });
       *
       * var marker = new AMap.Marker({
       *     map: map,
       *     position: [112, 30],
       *     icon: "https://webapi.amap.com/images/car.png",
       *     offset: new AMap.Pixel(-26, -13),
       * });
       * var marker1 = new AMap.Marker({
       *     map: map,
       *     position: [110, 31],
       *     icon: "https://webapi.amap.com/images/car.png",
       *     offset: new AMap.Pixel(-26, -13),
       * });
       * map.setFitView(
       *     [marker, marker1],  // 覆盖物数组
       *     false,  // 动画过渡到制定位置
       *     [60, 60, 60, 60],  // 周围边距，上、下、左、右
       *     10,  // 最大 zoom 级别
       * );
       * @returns {Bounds} bounds 新的地图视口范围
       */
      setFitView(
        overlays?: VectorLayer | Overlay[],
        immediately?: boolean,
        avoid?: number[],
        maxZoom?: number
      ): Bounds | undefined;

      /**
       * 根据 overlays 计算出合适的中心点和 zoom 级别
       *
       * @name getFitZoomAndCenterByOverlays
       * @function
       * @instance
       * @param {Overlay[]} overlays 覆盖物
       * @param {Number[]} [avoid=[0, 0, 0, 0]] 四周边距，上、下、左、右
       * @param {Number} [maxZoom=CoreMap.defaultZooms[1]] 最大 zoom 级别
       * @returns {[number, LngLat]} zoom 级别和中心点经纬度
       * @memberof Map
       */
      getFitZoomAndCenterByOverlays(overlayList: any[], avoid?: number[], maxZoom?: number): any[] | undefined;

      /**
       * 根据 bounds 计算出合适的中心点和 zoom 级别
       *
       * @name getFitZoomAndCenterByBounds
       * @function
       * @instance
       * @param {(number[] | Bounds)} bounds 需要计算的范围
       * @param {Number[]} [avoid=[0, 0, 0, 0]] 四周边距，上、下、左、右
       * @param {Number} [maxZoom=20] 最大 zoom 级别
       * @returns {[number, LngLat]} zoom 级别和中心点经纬度
       * @memberof Map
       */
      getFitZoomAndCenterByBounds(bounds: number[] | Bounds, avoid?: number[], maxZoom?: number): any[];

      /**
       * 添加控件。参数可以是插件列表中的任何插件对象，如：ToolBar、OverView、Scale等 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/mapbar/mapcontrol-control-add-remove/)
       * @name addControl
       * @function
       * @param {Control} control 控件对象
       * @instance
       * @memberof Map
       */
      addControl(control: Control | any): void;

      /**
       * 移除地图上的指定控件 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/mapbar/mapcontrol-control-add-remove/)
       * @name removeControl
       * @function
       * @param {Control} control 控件对象
       * @instance
       * @memberof Map
       */
      removeControl(control: Control): void;

      /**
       * 设置地图的显示样式，目前支持两种地图样式： </br>
       * 第一种：自定义地图样式，如 "amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86" </br>
       * 可前往地图自定义平台定制自己的个性地图样式； </br>
       * 第二种：官方样式模版,如 "amap://styles/grey"。 </br>
       * 其他模版样式及自定义地图的使用说明见 [开发指南](https://lbs.amap.com/api/jsapi-v2/guide/map/map-style/) </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/personalized-map/set-theme-style/) </br>
       * @name setMapStyle
       * @function
       * @param {String} value
       * @instance
       * @memberof Map
       */
      setMapStyle(value: string): void;

      /**
       * 获取地图显示样式
       *
       * @name getMapStyle
       * @function
       * @instance
       * @memberof Map
       * @returns
       */
      getMapStyle(): string;

      /**
       * 返回添加的覆盖物对象，可选类型包括marker、circle、polyline、polygon； </br>
       * Type可缺省，缺省时返回所有覆盖物（marker、circle、polyline、polygon）。 </br>
       * 返回结果不包含官方覆盖物等，比如定位marker，周边搜索圆等 </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/common/get-all-overlays/)
       * @name getAllOverlays
       * @function
       * @param {String} [type] 可选，覆盖物类型
       * @instance
       * @memberof Map
       * @returns {Overlay[]} 覆盖物数组
       */
      getAllOverlays(type?: string): any[];

      /**
       * 删除地图上所有的覆盖物
       *
       * @name clearMap
       * @function
       * @instance
       * @memberof Map
       */
      clearMap(): void;

      /**
       * 清除地图上的信息窗体。
       *
       * @name clearInfoWindow
       * @function
       * @instance
       * @memberof Map
       */
      clearInfoWindow(): void;

      /**
       * 获取地图显示元素种类
       *
       * @name getFeatures
       * @function
       * @instance
       * @memberof Map
       * @returns {String[]} 返回 features 的集合，可能有 bg（地图背景）、point（兴趣点）、
       * road（道路）、building（建筑物）
       */
      getFeatures(): string | string[] | undefined;

      /**
       * 设置地图上显示的元素种类，支持bg（地图背景）、point（兴趣点）、 </br>
       * road（道路）、building（建筑物） </br>
       * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/personalized-map/set-map-cotent/)
       * @name setFeatures
       * @function
       * @instance
       * @memberof Map
       * @param {string[]} features 类型数组
       * @example
       * map.setFeatures(['bg', 'road']);
       */
      setFeatures(features: string[]): void;

      /**
       * 设置文字是否拒绝掩模，true：不进行掩模，false：掩模
       *
       * @name setLabelRejectMask
       * @function
       * @instance
       * @param {boolean} reject 是否拒绝掩模
       * @memberof Map
       */
      setLabelRejectMask(reject: boolean): void;
    }
    export { Map_2 as Map };

    /**
     * 地图属性
     * @public
     * @export
     * @interface MapOptions
     */
    export interface MapOptions {
      zoom?: number;
      center?: [number, number];
      rotation?: number;
      pitch?: number;
      viewMode?: string;
      features?: string[];
      layers?: Layer[];
      zooms?: [number, number];
      dragEnable?: boolean;
      zoomEnable?: boolean;
      jogEnable?: boolean;
      pitchEnable?: boolean;
      rotateEnable?: boolean;
      animateEnable?: boolean;
      keyboardEnable?: boolean;
      doubleClickZoom?: boolean;
      scrollWheel?: boolean;
      touchZoom?: boolean;
      touchZoomCenter?: number;
      showLabel?: boolean;
      defaultCursor?: string;
      limitBounds?: Bounds;
      isHotspot?: boolean;
      mapStyle?: string;
      buildingColor?: any;
      wallColor?: string | number[];
      roofColor?: string | number[];
      showBuildingBlock?: boolean;
      showIndoorMap?: boolean;
      vectorMapForeign?: boolean;
      mask?: any[];

      backgroundColor?: string;
      skyColor?: string | number[];
      labelRejectMask?: boolean;
      langForeign?: string;
      pickWhenMoving?: boolean;
      asyncOverlay?: boolean;
    }

    /**
     * 点标记
     *
     * @public
     * @class Marker
     * @name Marker
     * @param {MarkerOptions} opts 点标记参数
     * @param {Map} opts.map 要显示该marker的地图对象
     * @param {Vector2|LngLat} opts.position 点标记在地图上显示的位置
     * @param {Icon | string} opts.icon 在点标记中显示的图标。可以传一个图标地址，也可以传Icon对象。有合法的content内容设置时，此属性无效。
     * @param {string | HTMLElement} opts.content 点标记显示内容。可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖。
     * @param {string} opts.title 鼠标滑过点标记时的文字提示。不设置则鼠标滑过点标无文字提示。
     * @param {boolean} opts.visible 点标记是否可见，默认值：true
     * @param {number} opts.zIndex 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
     * @param {Vector2 | Pixel} opts.offset 点标记显示位置偏移量，默认值为[0,0]。Marker指定position后，默认以marker左上角位置为基准点（若设置了anchor，则以anchor设置位置为基准点），对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
     * @param {string | Vector2} opts.anchor 设置点标记锚点，可选值：'top-left','top-center','top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right' [相关示例](https://lbs.amap.com/api/jsapi-v2/example/marker/marker-anchor)
     * @param {number} opts.angle 点标记的旋转角度，，广泛用于改变车辆行驶方向。默认值：0
     * @param {boolean} opts.clickable 点标记是否可点击，默认值: true
     * @param {boolean} opts.draggable 设置点标记是否可拖拽移动，默认值：false
     * @param {boolean} opts.bubble 事件是否冒泡，默认为 false
     * @param {Vector2} opts.zooms 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
     * @param {string} opts.cursor 指定鼠标悬停时的鼠，默认值：'pointer'
     * @param {boolean} opts.topWhenClick 鼠标点击时marker是否置顶，默认false ，不置顶
     * @param {object} opts.label 添加文本标注
     * @param {string} opts.label.content 文本标注的内容
     * @param {Pixel | Vector2 | number[]} opts.label.offset 为偏移量。如设置了 direction，以 direction 方位为基准点进行偏移。
     * @param {string} opts.label.direction 文本标注方位 可选值：'top'|'right'|'bottom'|'left'|'center'，默认值: 'right'。
     * @param {any} opts.extData 用户自定义属 ，支持JavaScript API任意数据类型，如 Marker的id等。可将自定义数据保存在该属性上，方便后续操作使用。
     * @example
     * var marker = new AMap.Marker({
     *     position: new AMap.LngLat(116.397428, 39.90923),
     *     icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
     *     anchor: 'bottom-center',
     * });
     * map.add(marker);
     */
    export class Marker extends OverlayDOM {
      type: string;

      className: string;

      constructor(opts?: MarkerOptions);

      /**
       * 获取点标记的文字提示
       * @name getTitle
       * @memberof Marker
       * @instance
       * @returns {string | undefined}
       * @function
       */
      /**
       * 获取文本标记的文字提示
       * @name getTitle
       * @memberof Text
       * @instance
       * @returns {string | undefined}
       * @function
       */
      /**
       * 获取获取灵活点标记标记的文字提示
       * @name getTitle
       * @memberof ElasticMarker
       * @instance
       * @returns {string | undefined}
       * @function
       */
      getTitle(): string | undefined;

      /**
       * 设置鼠标滑过点标记时的文字提示
       * @name setTitle
       * @param {string} title 点标记的文字提示
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 设置鼠标滑过文本标记时的文字提示
       * @name setTitle
       * @param {string} title 文本标记的文字提示
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 设置鼠标滑过灵活点标记时的文字提示
       * @name setTitle
       * @param {string} title 灵活点标记的文字提示
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      setTitle(title: string): void;

      /**
       * 当点标记未自定义图标时，获取Icon内容
       * @name getIcon
       * @returns {Icon | string | undefined}
       * @memberof Marker
       * @instance
       * @function
       */
      getIcon(): string | Icon | undefined;

      /**
       * 设置点标记的显示图标，设置了有效 content 则 icon 不生效
       * @name setIcon
       * @param {Icon | string} icon 点标记中显示的图标
       * @memberof Marker
       * @instance
       * @function
       */
      setIcon(icon: Icon | string): void;

      /**
       * 获取点标记文本标签内容
       * @name getLabel
       * @returns {LabelOptions} 文本标签设置项
       * @memberof Marker
       * @instance
       * @function
       */
      getLabel(): LabelOptions;

      /**
       * 设置点标记文本标签内容
       * @name setLabel
       * @param {LabelOptions} opts
       * @memberof Marker
       * @instance
       * @function
       */
      setLabel(opts: LabelOptions): void;

      /**
       * 获取点标记是否支持鼠标单击事件
       * @name getClickable
       * @returns {boolean}
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 获取文本标记是否支持鼠标单击事件
       * @name getClickable
       * @returns {boolean}
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 获取灵活点标记是否支持鼠标单击事件
       * @name getClickable
       * @returns {boolean}
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      getClickable(): boolean;

      /**
       * 设置点标记是否支持鼠标单击事件
       * @name setClickable
       * @param {boolean} clickable 默认值: true
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 设置文本标记是否支持鼠标单击事件
       * @name setClickable
       * @param {boolean} clickable 默认值: true
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 设置灵活点标记是否支持鼠标单击事件
       * @name setClickable
       * @param {boolean} clickable 默认值: true
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      setClickable(clickable?: boolean): void;

      /**
       * 获取点标记对象是否可拖拽移动
       * @name getDraggable
       * @returns {boolean}
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 获取文本标记对象是否可拖拽移动
       * @name getDraggable
       * @returns {boolean}
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 获取灵活点标记对象是否可拖拽移动
       * @name getDraggable
       * @returns {boolean}
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      getDraggable(): boolean;

      /**
       * 设置点标记对象是否可拖拽移动
       * @name setDraggable
       * @param {boolean} draggable
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 设置文本标记对象是否可拖拽移动
       * @name setDraggable
       * @param {boolean} draggable
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 设置灵活点标记对象是否可拖拽移动
       * @name setDraggable
       * @param {boolean} draggable
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      setDraggable(draggable: boolean): void;

      /**
       * 获取该点标记是否置顶
       * @name getTop
       * @returns {boolean}
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 获取该文本标记是否置顶
       * @name getTop
       * @returns {boolean}
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 获取该灵活点标记是否置顶
       * @name getTop
       * @returns {boolean}
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      getTop(): boolean;

      /**
       * 地图上有多个marker时，设置是否置顶该点标记
       * @name setTop
       * @param {boolean} isTop
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 地图上有多个marker时，设置是否置顶该文本标记
       * @name setTop
       * @param {boolean} isTop
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 地图上有多个marker时，设置是否置顶该灵活点标记
       * @name setTop
       * @param {boolean} isTop
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      setTop(isTop?: boolean): void;

      /**
       * 获取鼠标悬停时的光标设置
       * @name getCursor
       * @returns {string}
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 获取鼠标悬停时的光标设置
       * @name getCursor
       * @returns {string}
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 获取鼠标悬停时的光标设置
       * @name getCursor
       * @returns {string}
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      getCursor(): string | undefined;

      /**
       * 设置鼠标悬停时的光标
       * @name setCursor
       * @param {string} cursor
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 设置鼠标悬停时的光标
       * @name setCursor
       * @param {string} cursor
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 设置鼠标悬停时的光标
       * @name setCursor
       * @param {string} cursor
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      setCursor(cursor: string): void;

      /**
       * 获取用户自定义数据
       * @name getExtData
       * @returns {any | undefined}
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 获取用户自定义数据
       * @name getExtData
       * @returns {any | undefined}
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 获取用户自定义数据
       * @name getExtData
       * @returns {any | undefined}
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      getExtData(): any;

      /**
       * 设置用户自定义数据
       * @name setExtData
       * @param extData 用户自定义数据
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 设置用户自定义数据
       * @name setExtData
       * @param extData 用户自定义数据
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 设置用户自定义数据
       * @name setExtData
       * @param extData 用户自定义数据
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      setExtData(extData: any): void;

      /**
       * 移除点标记 [相关示例](https://lbs.amap.com/api/jsapi-v2/example/marker/marker-content)
       * @name remove
       * @memberof Marker
       * @instance
       * @function
       */
      /**
       * 移除点标记
       * @name remove
       * @memberof Text
       * @instance
       * @function
       */
      /**
       * 移除点标记
       * @name remove
       * @memberof ElasticMarker
       * @instance
       * @function
       */
      remove(): void;

      /**
       * 以给定时长/速度移动点标记到指定位置, 需加载 AMap.MoveAnimation 插件才可使用
       * @name moveTo
       * @function moveTo
       * @param {LngLat | Vector2} targetPosition 指定位置
       * @param {MoveToOptions} opts moveTo 动画参数
       * @param {number} opts.duration 每段动画持续时长, 单位：ms
       * @param {number} opts.speed 动画速度，已废弃
       * @param {EasingCallback} opts.easing easing 时间函数
       * @param {boolean} opts.autoRotation 点标记方向是否沿路径旋转
       * @example
       * AMap.plugin('AMap.MoveAnimation', function(){
       *     // 加载完 AMap.MoveAnimation 插件以后，创建一个 Marker 实例
       *     const animationMarker = new AMap.Marker({
       *         position: new AMap.LngLat(116.397389,39.909466),
       *         icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
       *         offset: new AMap.Pixel(-13, -26),
       *     });
       *     // 调用 moveTo 方法
       *     animationMarker.moveTo([116.397389, 39.909466], {
       *         duration: 1000,
       *         delay: 500,
       *     });
       * });
       * @memberof Marker
       * @instance
       */
      moveTo(...args: any): void;

      /**
       * 以指定的时长，点标记沿指定的路径移动，加载 AMap.MoveAnimation 后可以使用
       * JSAPI 2.0 可支持分段设置速度和时长 [相关示例](https://lbs.amap.com/api/jsapi-v2/example/marker/replaying-historical-running-data)
       *
       * @name moveAlong
       * @function moveAlong
       * @param {LngLat[] | Vector2[] | MoveAlongObj[]} path 路径数组
       * @param {MoveAlongOptions} opts moveAlong 动画参数 可选
       * @param {number | AnimationCallback} opts.duration 每段动画持续时长, 单位：ms
       * @param {number | AnimationCallback} opts.speed 每段动画速度，已废弃
       * @param {EasingCallback} opts.easing easing 时间函数
       * @param {boolean} opts.circlable 动画是否循环
       * @param {number | AnimationCallback} opts.delay 延迟动画时长
       * @param {number} opts.aniInterval 每段完整动画间隔时长
       * @param {boolean} opts.autoRotation 覆盖物是否沿路径旋转
       * @example
       * const path = [
       *     new AMap.LngLat(116.397389, 39.909466),
       *     new AMap.LngLat(116.379707, 39.968168),
       *     new AMap.LngLat(116.434467, 39.95001),
       *     new AMap.LngLat(116.46365, 39.979481),
       *     new AMap.LngLat(116.397389, 39.909466),
       * ];
       * // 分段设置时长
       * const customData = [
       *     { position: path[0], duration: 200 },
       *     { position: path[1], duration: 400 },
       *     { position: path[2], duration: 600 },
       *     { position: path[3], duration: 800 },
       *     { position: path[4], duration: 1000 },
       * ];
       * AMap.plugin('AMap.MoveAnimation', function(){
       *     // 加载完 AMap.MoveAnimation 插件以后，创建一个 Marker 实例
       *     const animationMarker = new AMap.Marker({
       *         position: new AMap.LngLat(116.397389,39.909466),
       *         angle: 90,
       *     });
       *     // 调用 moveAlong 方法
       *     animationMarker.moveAlong(customData);
       * });
       * @memberof Marker
       * @instance
       */
      moveAlong(...args: any): void;

      /**
       * 开启点标记动画，加载 AMap.MoveAnimation 后创建的点标记可以使用
       * @name startMove
       * @function startMove
       * @example
       * animationMarker.startMove();
       * @memberof Marker
       * @instance
       */
      startMove(): void;

      /**
       * 停止点标记动画，加载 AMap.MoveAnimation 后创建的点标记可以使用
       * @name stopMove
       * @function stopMove
       * @example
       * animationMarker.stopMove();
       * @memberof Marker
       * @instance
       */
      stopMove(): void;

      /**
       * 暂停点标记动画，加载 AMap.MoveAnimation 后创建的点标记可以使用
       * @name pauseMove
       * @function pauseMove
       * @example
       * animationMarker.pauseMove();
       * @memberof Marker
       * @instance
       */
      pauseMove(): void;

      /**
       * 重新启动点标记动画，加载 AMap.MoveAnimation 后创建的点标记可以使用
       * @name resumeMove
       * @function resumeMove
       * @example
       * animationMarker.resumeMove();
       * @memberof Marker
       * @instance
       */
      resumeMove(): void;
    }

    /**
     * 点标记属性
     * @interface MarkerOptions
     * @public
     */
    export interface MarkerOptions extends OverlayOptions {
      icon?: Icon | string;
      title?: string;
      label?: LabelOptions;
      clickable?: boolean;
      cursor?: string;
      draggable?: boolean;
      topWhenClick?: boolean;
      bubble?: boolean;
      text?: string;
    }

    /**
     * @public
     */
    export interface MassData {
      lnglat: LngLat;
      style?: number;
    }

    /**
     * @public
     */
    export interface MassMarkersOptions {
      zIndex?: number;
      opacity?: number;
      zooms?: [number, number];
      cursor?: string;
      alwaysRender?: boolean;
      style?: MassMarkersStyleOptions | MassMarkersStyleOptions[];
    }

    /**
     * @public
     */
    export interface MassMarkersStyleOptions {
      url: string;
      size: Vector2 | Size;
      rotation: number;
      anchor?: Pixel;
      zIndex?: number;
    }

    /**
     * 海量点类
     * @public
     * @name MassMarks
     * @class MassMarks
     * @extends {AMap.Event}
     * @param {MassData[]} data 海量点数据参数
     * @param {LngLat} data.lnglat 经纬度
     * @param {number} data.style 样式索引值
     * @param {MassMarkersOptions[]} opts 海量点参数
     * @param {number} opts.zIndex 图标 url
     * @param {number} opts.opacity 图标显示大小
     * @param {Vector2} opts.zooms 旋转角度
     * @param {string} opts.cursor 锚点位置
     * @param {MassMarkersStyleOptions | MassMarkersStyleOptions[]} opts.style 点展示优先级
     * @param {string} opts.style.url 图标 url
     * @param {Vector2 | Size} opts.style.size 图标显示大小
     * @param {number} opts.style.rotation 旋转角度
     * @param {Pixel} opts.style.anchor 锚点位置
     * @param {number} opts.style.zIndex 点展示优先级，默认为使用样式的索引值。
     * @example
     * // 创建 MassMarks 实例，[亲手试一试](https://lbs.amap.com/api/jsapi-v2/example/marker/massmarks)
     * var massMarks = new AMap.MassMarks(data, {
     *     opacity: 0.8,
     *     zIndex: 111,
     *     cursor: 'help',
     *     style: style,
     * });
     * // 将海量点实例添加到地图上
     * map.add(massMarks);
     */
    export class MassMarks extends Event {
      CLASS_NAME: string;

      constructor(data: MassData[], opts: MassMarkersOptions);

      /**
       * 设置显示MassMark的地图对象
       * @name setMap
       * @param {Map} map
       * @memberof MassMarks
       * @instance
       * @function
       */
      setMap(map: Map_2): void;

      /**
       * 获取Marker所在地图对象
       * @name getMap
       * @returns {any}
       * @memberof MassMarks
       * @instance
       * @function
       */
      getMap(): Map_2 | null;

      /**
       * 输出MassMark的数据集，数据结构同setDatas中的数据集
       * @name getData
       * @returns {MassData[]}
       * @memberof MassMarks
       * @instance
       * @function
       */
      getData(): MassData[];

      /**
       * 设置MassMark展现的数据集
       * @name setData
       * @param {MassData[]} data
       * @memberof MassMarks
       * @instance
       * @function
       */
      setData(data: MassData[]): void;

      /**
       * 获取MassMark的显示样式
       * @name getStyle
       * @returns {MassMarkersStyleOptions[]}
       * @memberof MassMarks
       * @instance
       * @function
       */
      getStyle(): MassMarkersStyleOptions | MassMarkersStyleOptions[];

      /**
       * 设置MassMark的显示样式，可设置单个样式或样式列表，每条数据通过设置的样式索引值获取对应样式
       * @name setStyle
       * @param {MassMarkersStyleOptions | MassMarkersStyleOptions[]} style
       * @memberof MassMarks
       * @instance
       * @function
       */
      setStyle(style?: MassMarkersStyleOptions | MassMarkersStyleOptions[]): void;

      /**
       * 获取海量点图层的透明度
       * @name setOpacity
       * @returns {number}
       * @memberof MassMarks
       * @instance
       * @function
       */
      getOpacity(): number | undefined;

      /**
       * 设置海量点图层透明度
       * @name setzIndex
       * @param {number} opacity 透明度
       * @memberof MassMarks
       * @instance
       * @function
       */
      setOpacity(opacity: number): void;

      /**
       * 获取海量点图层的透明度
       * @name getzIndex
       * @returns {number}
       * @memberof MassMarks
       * @instance
       * @function
       */
      getzIndex(): number | undefined;

      /**
       * 设置海量点图层叠加顺序
       * @name setzIndex
       * @param {number} zIndex 叠加顺序
       * @memberof MassMarks
       * @instance
       * @function
       */
      setzIndex(zIndex: number): void;

      /**
       * 获取海量点图层可见层级范围
       * @name getZooms
       * @returns {Vector2}
       * @memberof MassMarks
       * @instance
       * @function
       */
      getZooms(): [number, number];

      /**
       * 设置海量点图层可见层级范围
       * @name setZooms
       * @param {Vector2} zooms 可见层级范围
       * @memberof MassMarks
       * @instance
       * @function
       */
      setZooms(zooms: [number, number]): void;

      /**
       * 显示海量点图层
       * @name show
       * @memberof MassMarks
       * @instance
       * @function
       */
      show(): void;

      /**
       * 隐藏海量点图层
       * @name hide
       * @memberof MassMarks
       * @instance
       * @function
       */
      hide(): void;

      /**
       * 清除海量点
       * @name clear
       * @memberof MassMarks
       * @instance
       * @function
       */
      clear(): void;
    }

    /**
     * @public
     */
    export interface NameSpace {
      createDefaultLayer: typeof createDefaultLayer;
      Map: typeof Map_2;
      ImageLayer: typeof ImageLayer;
      TileLayer: typeof TileLayer;
      NebulaLayer: typeof NebulaLayer;
      Buildings: typeof BuildingLayer;
      DistrictLayer: typeof DistrictLayer;
      CanvasLayer: typeof CanvasLayer;
      CustomLayer: typeof CustomLayer;
      LabelsLayer: typeof LabelsLayer;
      MassMarks: typeof MassMarks;
      Event: typeof Event;
      IndoorMap: typeof IndoorMap;
      version: string;
      plugin: (plugins: string | string[], cb: any) => void;
      LngLat: typeof LngLat;
      Pixel: typeof Pixel;
      Size: typeof Size;
      Icon: typeof Icon;
      Bounds: typeof Bounds;
      Marker: typeof Marker;
      Text: typeof Text;
      InfoWindow: typeof InfoWindow;
      ContextMenu: typeof ContextMenu;
      LabelMarker: typeof LabelMarker;
      Polygon: typeof Polygon;
      Rectangle: typeof Rectangle;
      Ellipse: typeof Ellipse;
      Circle: typeof Circle;
      CircleMarker: typeof CircleMarker;
      Polyline: typeof Polyline;
      BezierCurve: typeof BezierCurve;
      OverlayGroup: typeof OverlayGroup;
      LayerGroup: typeof LayerGroup;
      Control: typeof Control;
      convertFrom: typeof convertFrom;
      Util: typeof Util;
      GeometryUtil: typeof GeometryUtil;
      DomUtil: typeof DomUtil;
      Browser: typeof Browser;
      getConfig: getConfigType;
      WebService: typeof WebService;
      extend: typeof extend;
      BuryPoint: typeof BuryPoint;

      Heatmap: typeof Heatmap;
    }

    /**
     * @public
     * @private
     */
    export class NebulaLayer extends Layer {
      CLASS_NAME: string;

      show(): void;

      hide(): void;
    }

    /**
     * @public
     * @private
     */
    abstract class Overlay extends Event {}

    /**
     * DOM 类覆盖物基类
     * @name OverlayDOM
     * @class OverlayDOM
     * @public
     * @private
     */
    class OverlayDOM extends Overlay {
      type: string;

      className: string;

      get CLASS_NAME(): string;

      dom: HTMLElement;

      amapId: number;

      constructor(opts?: OverlayOptions, defaultOpts?: any);

      getMap(): Map_2 | null;

      setMap(map: Map_2 | null | undefined): void;

      addTo(map: Map_2): void;

      add(map: Map_2): void;

      remove(): void;

      show(): void;

      hide(): void;

      getPosition(): LngLat | null;

      setPosition(position: Vector2): void;

      getAnchor(): string | Vector2;

      setAnchor(anchor: string): void;

      getOffset(): Pixel;

      setOffset(offset: Vector2 | Pixel): void;

      getAngle(): number;

      setAngle(angle: number): void;

      getOrientation(): number | null | undefined;

      setOrientation(orientation: number | undefined): void;

      getSize(): Vector2;

      setSize(size: Vector2 | Size): void;

      getzIndex(): number | undefined;

      setzIndex(zIndex: number): void;

      getOptions(): OverlayOptions;

      getContent(): string | HTMLElement;

      setContent(content?: HTMLElement | string): void;

      getBounds(): Bounds | null;

      getVisible(): boolean;

      updateOverlay(params?: any): void;

      destroy(): void;

      getCursor(): string | undefined;

      getContentDom(): HTMLElement;
    }

    /**
     * @public
     * @description OverlayGroup 类用来包装其它覆盖物类的实例，对实例集合做整体操作，避免开发者对多个需要设置同样属性的覆盖物实例做循环处理。
     * 此外从group中移除该覆盖物时，也会将该覆盖物从group对应的map中移除。
     * 目前OverlayGroup支持Marker, Polygon, Polyline, Circle,CircleMarker, Rectangle, Ellipse 和 BezierCurve。
     * @export
     * @class OverlayGroup
     * @param {Array<Overlay>} overlays
     */
    export class OverlayGroup implements IVectorOverlay {
      get CLASS_NAME(): OverlayType;

      constructor(overlays?: Array<VectorOverlay | OverlayDOM>);

      /**
       * 	添加单个覆盖物到集合中，不支持添加重复的覆盖物
       * @name addOverlay
       * @function
       * @param {Overlay} overlay
       * @memberof OverlayGroup
       * @instance
       */
      addOverlay(overlay: VectorOverlay | OverlayDOM): void;

      /**
       * 添加覆盖物数组到集合中，不支持添加重复的覆盖物
       * @name addOverlays
       * @function
       * @param {Overlay[]} overlays
       * @memberof OverlayGroup
       * @instance
       */
      addOverlays(overlays: Array<VectorOverlay | OverlayDOM>): void;

      /**
       * 返回当前集合中所有的覆盖物
       * @name getOverlays
       * @function
       * @memberof OverlayGroup
       * @instance
       * @returns {Array}
       */
      getOverlays(): any[];

      /**
       * 判断传入的覆盖物实例是否在集合中
       * @name hasOverlay
       * @param {Overlay} overlay
       * @returns {boolean}
       * @memberof OverlayGroup
       * @instance
       */
      hasOverlay(overlay: VectorOverlay | OverlayDOM): boolean;

      /**
       * 从集合中删除传入的覆盖物实例
       * @name removeOverlay
       * @function
       * @param {Overlay} overlay
       * @memberof OverlayGroup
       * @instance
       */
      removeOverlay(overlay: VectorOverlay | OverlayDOM): void;

      /**
       * 从集合中删除传入的覆盖物实例数组
       * @name removeOverlays
       * @function
       * @param {Array} overlays
       * @memberof OverlayGroup
       * @instance
       */
      removeOverlays(overlays: Array<VectorOverlay | OverlayDOM>): void;

      /**
       * 清空集合
       * @name clearOverlays
       * @function
       * @memberof OverlayGroup
       * @instance
       */
      clearOverlays(): void;

      /**
       * 对集合中的覆盖物做迭代操作，其中iterator的函数定义是：
       * function(overlay, index, collections)，相关含义如下：
       * overlay: 当前迭代到的覆盖物
       * index: 该覆盖物在集合中的序列号(从0开始)
       * collections: 所有覆盖物实例
       * @name eachOverlay
       * @function
       * @param {Function} iterator
       * @memberof OverlayGroup
       * @instance
       */
      eachOverlay(iterator: any): void;

      /**
       * 在地图上显示集合中覆盖物
       * @name show
       * @function
       * @memberof OverlayGroup
       * @instance
       */
      show(): void;

      /**
       * 在地图上隐藏集合中覆盖物
       * @name hide
       * @function
       * @memberof OverlayGroup
       * @instance
       *
       */
      hide(): void;

      /**
       * 	修改覆盖物属性(包括线样式、样色等等)
       * @name setOptions
       * @function
       * @param {Object} opt
       * @memberof OverlayGroup
       * @instance
       */
      setOptions(opt: any): void;

      on(type: string, fn: any, context?: any, once?: boolean): void;

      off(type: string, fn: any, context?: any, once?: boolean): void;
    }

    /**
     * 覆盖物参数
     * @public
     * @export
     * @name OverlayOptions
     * @interface OverlayOptions
     */
    export interface OverlayOptions {
      map?: Map_2;
      position?: Vector2;
      content?: string | HTMLElement;
      visible?: boolean;
      zIndex?: number;
      extData?: any;
      size?: Vector2 | Size;
      offset?: Vector2 | Pixel;
      anchor?: string | Vector2;
      rotate?: number;
      angle?: number;
      orientation?: number | null;
      scale?: number;
      draggable?: boolean;
      zooms?: Vector2;
      noSelect?: boolean;
      innerOverlay?: boolean;
      isCustom?: boolean;
    }

    /**
     * @public
     * @private
     */
    type OverlayType =
      | 'Overlay'
      | 'Overlay.Polygon'
      | 'Overlay.CorePolygon'
      | 'Overlay.CorePolyline'
      | 'Overlay.Rectangle'
      | 'Overlay.Ellipse'
      | 'Overlay.Circle'
      | 'Overlay.CircleMarker'
      | 'Overlay.Polyline'
      | 'Overlay.BezierCurve'
      | 'Overlay.OverlayGroup'
      | 'Overlay.GeoJSON';

    /**
     * 像素坐标，确定地图上的一个像素点。
     * @public
     * @export
     * @class Pixel
     * @param {number} x
     * @param {number} y
     */
    export class Pixel {
      className: string;

      x: number;

      y: number;

      constructor(x: number, y: number, isRound?: boolean);

      /**
       * 获取像素横坐标
       * @name getX
       * @function
       * @return {Number}
       * @memberof Pixel
       * @instance
       */
      getX(): number;

      round(): Pixel;

      /**
       * 获取像素纵坐标
       * @name getY
       * @function
       * @return {Number}
       * @memberof Pixel
       * @instance
       */
      getY(): number;

      /**
       * 以字符串形式返回像素坐标对象
       *
       * @name toString
       * @function
       * @returns {string}
       * @memberof Pixel
       * @instance
       */
      toString(): string;

      /**
       * 当前像素坐标与传入像素坐标是否相等
       * @name equals
       * @function
       * @param {Pixel} point
       * @returns {boolean}
       * @memberof Pixel
       * @instance
       */
      equals(point: Pixel): boolean;

      toArray(): number[];

      subtract(other: Pixel, isRound?: boolean): Pixel;

      /**
       * @private
       * @param {Number} num
       * @param {Boolean} noWrap
       * @return {module:basetype/AMap.Pixel}
       */
      multiplyBy(num: number, noWrap?: boolean): Pixel;

      direction(): number | null;

      toJSON(): [number, number];
    }

    /**
     * 构造多边形对象，通过PolygonOptions指定多边形样式
     *
     * @public
     * @export
     * @class Polygon
     * @implements {Event}
     * @param {PolygonOptions} opts
     * @param {Array<LngLat>|Array<Array<LngLat>>|Array<Array<Array<LngLat>>>} opts.path  多边形轮廓线的节点坐标数组。
     * 支持 单个普通多边形({Array<LngLat>})，单个带孔多边形({Array<Array<LngLat>>})，多个带孔多边形({Array<Array<Array<LngLat>>>})
     * @param {number} [opts.zIndex=10]  多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
     * @param {boolean}  [opts.bubble = false] 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）
     * @param {string} [opts.cursor] 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
     * @param {string } [opts.strokeColor = #00D3FC] 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
     * @param {number} [opts.strokeOpacity = 0.9]  轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     * @param {number} [opts.strokeWeight = 2]  轮廓线宽度
     * @param {string} [opts.fillColor=#00B2D5]	多边形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
     * @param {number} [opts.fillOpacity=0.5] 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.5
     * @param {boolean} [opts.draggable=false] 设置多边形是否可拖拽移动，默认为false
     * @param {object} [opts.extData]  用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
     * @param {'solid'|'dashed'} [opts.strokeStyle = solid]  轮廓线样式，实线:solid，虚线:dashed
     * @param {number[]}  [opts.strokeDasharray] 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值：
     * 实线：[0,0,0]
     * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
     * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
     */
    export class Polygon extends CorePolygon {
      className: OverlayType;

      constructor(opts?: PolygonOptions);

      /**
       * 获取多边形的属性
       *
       * @returns {Object} [多边形配置](#polygon)
       * @memberof Polygon
       * @instance
       */
      getOptions(): any;

      /**
       * 修改多边形属性（样式风格，包括组成多边形轮廓线的节点、轮廓线样式等。属性详情参看PolygonOptions列表）
       *
       * @param {PolygonOptions} optsArg
       * @memberof Polygon
       * @instance
       */
      setOptions(optsArg: PolygonOptions): void;

      /**
       * 获取多边形轮廓线节点数组。
       * @name getPath
       * @returns {Array<LngLat>|Array<Array<LngLat>>|Array<Array<Array<LngLat>>>} 返回路径
       * @memberof Polygon
       * @function
       * @instance
       */
      getPath(): LngLat[] | LngLat[][] | LngLat[][][] | undefined;

      /**
       * 获取当前多边形的矩形范围对象。
       *
       * @name getBounds
       * @function
       * @returns {Bounds}
       * @memberof Polygon
       * @instance
       */
      getBounds(): Bounds | undefined;

      /**
       * 获取多边形的面积（单位：平方米）
       * @name getArea
       * @function
       * @returns {number}
       * @memberof Polygon
       * @instance
       */
      getArea(): number;

      /**
       * 判断坐标是否在多边形内
       * @name contains
       * @function
       * @param {LngLatLike} originPoint
       * @returns {boolean} true 包含，false 不包含
       * @memberof Polygon
       * @instance
       */
      contains(originPoint: LngLatLike): boolean;

      /**
       * 多边形轮廓线的节点坐标数组。支持 单个普通多边形({Array<LngLat>})，单个带孔多边形({Array<Array<LngLat>>})，多个带孔多边形({Array<Array<Array<LngLat>>>})
       *
       * @name setPath
       * @param {(Array<LngLatLike> | Array<Array<LngLatLike>> | Array<Array<Array<LngLatLike>>>)} [path]
       * @memberof Polygon
       * @instance
       * @function
       */
      setPath(path?: LngLatLike[] | LngLatLike[][] | LngLatLike[][][]): void;

      _queryIndex(originPoint: LngLatLike): number;
    }

    /**
     * @public
     */
    export type PolygonOptions = PolygonSharedOptions & {
      path?: LngLatLike[] | LngLatLike[][] | LngLatLike[][][];
    };

    /**
     * @name PolygonSharedOptions
     * @interface
     * @public
     */
    export interface PolygonSharedOptions {
      zIndex?: number;
      bubble?: boolean;
      cursor?: string;
      strokeColor?: string | Function;
      strokeWeight?: number;
      strokeOpacity?: number;
      fillColor?: string | Function;
      fillOpacity?: number | Function;
      draggable?: boolean;
      extData?: any;
      strokeStyle?: 'solid' | 'dashed';
      strokeDasharray?: [number, number] | [number, number, number, number];

      zooms?: [number, number];
    }

    /**
     * 构造折线对象，支持 lineString 和 MultiLineString
     * @implements {Event}
     * @public
     * @param opts  {PolylineOptions}
     * @param {Array<LngLat>|Array<Array<LngLat>>} opts.path  polyline 路径，支持 lineString 和 MultiLineString
     * @param {number} [opts.zIndex=10]  多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
     * @param {boolean}  [opts.bubble = false] 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）
     * @param {string} [opts.cursor] 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
     * @param {string } [opts.strokeColor = #00D3FC] 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
     * @param {number} [opts.strokeOpacity = 0.5]  轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.5
     * @param {number} [opts.strokeWeight = 2]  轮廓线宽度
     * @param {number} [opts.borderWeight = 2]	描边线宽度
     * @param {boolean} [opts.isOutline=false]  是否显示描边,默认false
     * @param {number} [opts.borderWeight = 1]	描边的宽度，默认为1
     * @param {string} [opts.outlineColor=#00B2D5] 线条描边颜色，此项仅在isOutline为true时有效，默认：#00B2D5
     * @param {boolean} [opts.draggable=false] 设置多边形是否可拖拽移动，默认为false
     * @param {object} [opts.extData]  用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
     * @param {'solid'|'dashed'} [opts.strokeStyle = solid]  轮廓线样式，实线:solid，虚线:dashed
     * @param {number[]}  [opts.strokeDasharray] 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值：
     * 实线：[0,0,0]
     * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
     * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
     * @param {'miter'|'round'|'bevel'} [opts.lineJoin = miter] 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
     * @param {'butt'|'round'|'square'} [opts.lineCap = butt] 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
     * @param {boolean} [opts.geodesic=false] 是否绘制成大地线，默认false
     * @param {boolean} [opts.showDir=false] 是否延路径显示白色方向箭头,默认false。建议折线宽度大于6时使用
     * @export
     * @class Polyline
     * @classdesc 折线，支持单条和多条折线
     */
    export class Polyline extends CorePolyline {
      readonly className: OverlayType;

      _opts: Required<PolylineOptions>;

      constructor(opts?: Partial<PolylineOptions>);

      /**
       * 获取线的属性
       * @name getOptions
       * @function
       * @returns {PolylineOptions}
       * @memberof Polyline
       * @instance
       */
      getOptions(): any;

      /**
       * 获取折线路径的节点数组。
       * @name getPath
       * @function
       * @returns {Array<LngLat>|Array<Array<LngLat>>}
       * @memberof Polyline
       * @instance
       */
      getPath(): LngLat[] | LngLat[][] | undefined;

      /**
       * 获取当前折线的矩形范围对象
       * @name getBounds
       * @function
       * @returns {(Bounds | undefined)}
       * @memberof Polyline
       * @instance
       */
      getBounds(): Bounds | undefined;

      /**
       * 设置组成该折线的节点数组,支持单条折线(LngLatLike[]) 多条折线（LngLatLike[][]）
       *
       * @param {(Array<LngLatLike> | Array<Array<LngLatLike>>)} [path]
       * @function
       * @returns
       * @memberof Polyline
       * @instance
       */
      setPath(path?: LngLatLike[] | LngLatLike[][]): void;

      moveWithPixel(dx: number, dy: number): void;

      /**
       * 获取折线的总长度（单位：米）
       * @name getLength
       * @function
       * @returns {number}
       * @memberof Polyline
       * @instance
       */
      getLength(): number;

      /**
       * 修改折线属性（包括路径的节点、线样式、是否绘制大地线等。属性详情参看PolylineOptions列表)
       * @name setOptions
       *
       * @param {PolylineOptions} optsArg
       * @memberof Polyline
       * @instance
       */
      setOptions(optsArg: PolylineOptions): void;

      /**
       * 判断坐标是否在折线内
       * @name contains
       * @function
       * @param {LngLatLike} point
       * @returns {boolean}
       * @memberof Polyline
       * @instance
       */
      contains(originPoint: LngLatLike): boolean;
    }

    /**
     * @public
     * @private
     */
    export type PolylineOptions = LineSharedOptions & {
      path?: LngLatLike[] | LngLatLike[][];
    };

    /**
     * 省份图层
     * @public
     * @private
     * @class ProvinceLayer
     * @extends {DistrictLayer}
     */
    class ProvinceLayer extends DistrictLayer {
      CLASS_NAME: string;

      constructor(opts: DistrictLayerOptions);
    }

    /**
     * @public
     */
    class RasterLayer extends Layer {
      CLASS_NAME: string;

      constructor(opts: TileLayerOptions);
    }

    /**
     * 构造矩形对象，通过RectangleOptions指定多边形样式
     *
     * @public
     * @export
     * @class Rectangle
     * @implements {Event}
     * @param {RectangleOptions} opts
     * @param {Map} opts.map  要显示该覆盖物的地图对象
     * @param {Bounds} opts.bounds 矩形的范围
     * @param {number} [opts.zIndex=10]  矩形覆盖物的叠加顺序。地图上存在多个矩形覆盖物叠加时，通过该属性使级别较高的矩形覆盖物在上层显示
     * @param {boolean}  [opts.bubble = false] 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）
     * @param {string} [opts.cursor] 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
     * @param {string } [opts.strokeColor = #00D3FC] 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
     * @param {number} [opts.strokeOpacity = 0.9]  轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     * @param {number} [opts.strokeWeight = 2]  轮廓线宽度
     * @param {string} [opts.fillColor=#00B2D5]	矩形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
     * @param {number} [opts.fillOpacity=0.5] 矩形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.5
     * @param {boolean} [opts.draggable=false] 设置矩形是否可拖拽移动，默认为false
     * @param {object} [opts.extData]  用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
     * @param {'solid'|'dashed'} [opts.strokeStyle = solid]  轮廓线样式，实线:solid，虚线:dashed
     * @param {number[]}  [opts.strokeDasharray] 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值：
     * 实线：[0,0,0]
     * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
     * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
     */
    export class Rectangle extends CombinePolygon<Required<RectangleOptions>> {
      readonly className: OverlayType;

      /**
       * @private
       */
      constructor(opts?: RectangleOptions);

      /**
       * 设置矩形的范围
       * @name setBounds
       * @function
       * @param {Bounds} bounds
       * @returns {void}
       * @memberof Rectangle
       * @instance
       */
      setBounds(bounds: Bounds): void;

      /**
       * 修改矩形属性（样式风格，包括组成矩形轮廓线的节点、轮廓线样式等。属性详情参看RectangleOptions列表）
       * @name setOptions
       * @function
       * @param {RectangleOptions} optsArg
       * @memberof Rectangle
       * @instance
       */
      setOptions(optsArg: RectangleOptions): void;

      /**
       * 判断坐标是否在矩形上
       * @name contains
       * @function
       * @param {LngLatLike} point
       * @returns {boolean}
       * @memberof Rectangle
       * @instance
       */
      'contains': (originPoint: LngLatLike) => boolean;

      getBounds(): Bounds | undefined;

      /**
       * 获取矩形的中心点
       * @name getCenter
       * @function
       * @returns {LngLat}
       * @memberof Rectangle
       * @instance
       */
      getCenter(): LngLat | undefined;
    }

    /**
     * @public
     * @private
     */
    export type RectangleOptions = PolygonSharedOptions & {
      bounds?: Bounds;
    };

    /**
     * 图块切片加载完成事件
     * @event complete
     * @memberof Traffic
     * @instance
     */
    /**
     * 路网图层，展示道路信息 </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/layers/roadnet)
     *
     * @param {RoadnetLayerOptions} opts
     * @param {[Number,Number]} [opts.zooms=[2,20]] 支持的缩放级别范围，默认范围 [2-20]
     * @param {Number} [opts.opacity=1] 透明度，默认 1
     * @param {Boolean} [opts.visible=true] 是否显示，默认 true
     * @param {Number} [opts.zIndex=4] 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
     * @param {Number} [opts.tileSize=256] 切片大小，取值： </br>
     * 256，表示切片大小为256*256， </br>
     * 128，表示切片大小为128*128， </br>
     * 64，表示切片大小为64*64。默认值为256
     * @export
     * @class RoadNet
     * @extends {TileLayer}
     * @public
     */
    class RoadNet extends TileLayer {
      CLASS_NAME: string;

      constructor(opts?: RoadnetLayerOptions);

      /**
       * 设置图层可见
       * @name show
       * @function
       * @instance
       * @memberof RoadNet
       */
      show(): void;

      /**
       * 设置图层隐藏
       * @name hide
       * @function
       * @instance
       * @memberof RoadNet
       */
      hide(): void;
    }

    /**
     * @public
     */
    export interface RoadnetLayerOptions {
      zooms?: [number, number];
      opacity?: number;
      tileSize?: number;
      zIndex?: number;
      visible?: boolean;
    }

    /**
     * 卫星图层类，继承自 TileLayer。
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/layers/satellite)
     * @public
     * @param {SatelliteLayerOptions} opts
     * @param {[Number,Number]} [opts.zooms=[2,20]] 支持的缩放级别范围，默认范围 [2-20]
     * @param {Number} [opts.opacity=1] 透明度，默认 1
     * @param {Boolean} [opts.visible=true] 是否显示，默认 true
     * @param {Number} [opts.zIndex=4] 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
     * @param {Number} [opts.tileSize=256] 切片大小，取值： </br>
     * 256，表示切片大小为256*256， </br>
     * 128，表示切片大小为128*128， </br>
     * 64，表示切片大小为64*64。默认值为256
     * @export
     * @class Satellite
     * @extends {TileLayer}
     */
    class Satellite extends TileLayer {
      CLASS_NAME: string;

      constructor(opts?: SatelliteLayerOptions);
    }

    /**
     * 图块切片加载完成事件
     * @event complete
     * @memberof TileLayer
     * @instance
     */
    /**
     * @public
     */
    export interface SatelliteLayerOptions {
      tileUrl?: string;
      zooms?: [number, number];
      opacity?: number;
      tileSize?: number;
      zIndex?: number;
      visible?: boolean;
    }

    /**
     * 地物对象的像素尺寸
     * @public
     * @class Size
     * @param {number} width 宽度
     * @param {number} height 高度
     */
    export class Size {
      className: string;

      width: number;

      height: number;

      constructor(width: number, height: number, isRound?: boolean);

      /**
       * 获取像素横坐标
       * @name getWidth
       * @function
       * @return {Number}
       * @memberof Size
       * @instance
       */
      getWidth(): number;

      /**
       * 获取像素纵坐标
       * @name getHeight
       * @function
       * @return {Number}
       * @memberof Size
       * @instance
       */
      getHeight(): number;

      /**
       * 以字符串形式返回尺寸大小对象
       *
       * @name toString
       * @function
       * @returns {string}
       * @memberof Size
       * @instance
       */
      toString(): string;

      toArray(): number[];
    }

    /**
     * 文本标记参数
     * @typedef {Object} TextOptions@typedef {Object} TextOptions
     * @property {Map} map 要显示该marker的地图对象
     * @property {Vector|LngLat} position 点标记在地图上显示的位置
     * @property {LabelOptions} text 标记显示的文本内容
     * @property {string} title 鼠标滑过点标记时的文字提示
     * @property {boolean} visible 点标记是否可见，默认为true
     * @property {number} zIndex 点标记的叠加顺序
     * @property {number[] | Pixel} offset 点标记显示位置偏移量
     * @property {string | Vector} anchor 设置点标记锚点
     * @property {number} angle 点标记的旋转角度
     * @property {boolean} clickable 点标记是否可点击
     * @property {boolean} draggable 设置点标记是否可拖拽移动
     * @property {boolean} bubble 事件是否冒泡，默认为 false
     * @property {Vector} zooms 点标记显示的层级范围
     * @property {string} cursor 指定鼠标悬停时的鼠标样式
     * @property {boolean} topWhenClick 鼠标点击时marker是否置顶
     * @property {any} extData 用户自定义属性
     * @property {object} style 设置文本样式，Object同css样式表，如:{'background-color':'red'}
     * @private
     */
    /**
     * 文本标记
     *
     * @public
     * @export
     * @class Text
     * @name Text
     * @param {TextOptions} opts 文本参数
     * @param {Map} opts.map 要显示该marker的地图对象
     * @param {Vector|LngLat} opts.position 点标记在地图上显示的位置
     * @param {LabelOptions} opts.text 标记显示的文本内容
     * @param {string} opts.title 鼠标滑过点标记时的文字提示
     * @param {boolean} opts.visible 点标记是否可见，默认为true
     * @param {number} opts.zIndex 点标记的叠加顺序
     * @param {Vector | Pixel} opts.offset 点标记显示位置偏移量，默认值[0, 0]。[图解说明](https://lbs.amap.com/api/jsapi-v2/guide/overlays/marker)
     * @param {string | Vector} opts.anchor 设置点标记锚点。默认值：'center'。可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
     * @param {number} opts.angle 点标记的旋转角度。默认值：0 。注：angle属性是使用CSS3来实现的，支持IE9及以上版本
     * @param {boolean} opts.clickable 点标记是否可点击。默认值: true
     * @param {boolean} opts.draggable 设置点标记是否可拖拽移动。默认值：false
     * @param {boolean} opts.bubble 事件是否冒泡，默认值：false
     * @param {Vector} opts.zooms 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]。
     * @param {string} opts.cursor 指定鼠标悬停时的鼠标样式。
     * @param {boolean} opts.topWhenClick 鼠标点击时marker是否置顶，默认值: false
     * @param {any} opts.extData 用户自定义属性 ，支持JavaScript API任意数据类型，如 Marker的id等。可将自定义数据保存在该属性上，方便后续操作使用。
     * @param {object} opts.style 设置文本样式，Object同css样式表，如:{'background-color':'red'}
     * @example
     * var text = new AMap.Text({
     *     position: new AMap.LngLat(116.397428, 39.90923),
     *     anchor: 'bottom-center',
     *     text: '文本标记',
     *     style: {'background-color':'red'},
     * });
     * map.add(text);
     */
    export class Text extends Marker {
      className: string;

      type: string;

      constructor(opts?: TextOptions);

      /**
       * 获取文本标记内容
       * @name getText
       * @returns {string | undefined}
       * @memberof Text
       * @instance
       */
      getText(): string | undefined;

      /**
       * 设置文本标记内容
       * @setText
       * @param {string} text
       * @memberof Text
       * @instance
       */
      setText(text: string): void;

      /**
       * 修改文本标记样式。Object同css样式表，如:{'background-color':'red'}
       * @name setStyle
       * @param style
       * @memberof Text
       * @instance
       */
      setStyle(style: any): void;
    }

    /**
     * @public
     */
    export interface TextOptions extends MarkerOptions {
      text?: string;
      style?: any;
    }

    /**
     * @public
     */
    export interface TextStyleOptions {
      fontSize?: number;
      fontFamily?: string;
      fontWeight?: string;
      fillColor?: string;
      strokeColor?: string;
      strokeWidth?: number;
      padding?: string | Array<string | number>;
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      fold?: boolean;
    }

    /**
     * 切片图层类，该类为基础类。 </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/thirdlayer/custom-grid-map)
     * @public
     * @export
     * @class TileLayer
     * @extends {Layer}
     * @param {TileLayerOptions} opts
     * @param {String} opts.tileUrl 切片取图地址
     * 如：'https://abc{0,1,2,3}.amap.com/tile?x=[x]&y=[y]&z=[z]'
     * [x]、[y]、[z]分别替代切片的xyz。
     * @param {[Number,Number]} [opts.zooms=[2,20]] 支持的缩放级别范围，默认范围 [2-20]
     * @param {[Number, Number]} [opts.dataZooms=[2,20]] 数据支持的缩放级别范围，默认范围 [2-20]
     * @param {Number} [opts.opacity=1] 透明度，默认 1
     * @param {Boolean} [opts.visible=true] 是否显示，默认 true
     * @param {Number} [opts.zIndex=4] 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
     * @param {Number} [opts.tileSize=256] 切片大小，取值：
     * 256，表示切片大小为256*256，
     * 128，表示切片大小为128*128，
     * 64，表示切片大小为64*64。默认值为256
     * @param {Function(x,y,z)} opts.getTileUrl 获取图块取图地址，该属性值为一个字符串或者一个函数 </br>
     * 字符串如：'https://abc.amap.com/tile?x=[x]&y=[y]&z=[z]' </br>
     * 函数参数z为地图缩放级别，x,y分别为相应缩放级别下图块横向、纵向索引号， </br>
     * 该属性可以用来改变取图地址，实现自定义栅格图。
     */
    export class TileLayer extends RasterLayer {
      /**
       * @private
       */
      static 'Satellite': typeof Satellite;

      /**
       * @private
       */
      static 'Traffic': typeof VectorTraffic | typeof Traffic;

      /**
       * @private
       */
      static 'RoadNet': typeof RoadNet;

      /**
       * @private
       */
      static 'Flexible': typeof Flexible;

      /**
       * @private
       */
      static 'WMTS': typeof WMTS;

      /**
       * @private
       */
      static 'WMS': typeof WMS;

      CLASS_NAME: string;

      constructor(opts?: TileLayerOptions);

      /**
       * 设置图层的取图地址
       * @name setTileUrl
       * @function
       * @instance
       * @param {String} url 瓦片图地址
       * @memberof TileLayer
       */
      setTileUrl(url: string): void;
    }

    /**
     * 栅格瓦片图层配置项
     *
     * @public
     * @export
     * @interface TileLayerOptions
     */
    export interface TileLayerOptions {
      url?: string;
      tileUrl?: string;
      zooms?: [number, number];
      dataZooms?: [number, number];
      opacity?: number;
      tileSize?: number;
      zIndex?: number;
      visible?: boolean;
    }

    /**
     * 图块切片加载完成事件
     * @event complete
     * @memberof Satellite
     * @instance
     */
    /**
     * 实时交通图层类，继承自TileLayer。 </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/layers/trafffic)
     *
     * @public
     * @param {TrafficLayerOptions} opts
     * @param {Boolean} opts.autoRefresh 是否自动更新数据，默认开启
     * @param {Number} opts.interval 自动更新数据的间隔毫秒数，默认 180ms
     * @param {[Number,Number]} [opts.zooms=[2,20]] 支持的缩放级别范围，默认范围 [2-20]
     * @param {Number} [opts.opacity=1] 透明度，默认 1
     * @param {Boolean} [opts.visible=true] 是否显示，默认 true
     * @param {Number} [opts.zIndex=4] 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
     * @param {Number} [opts.tileSize=256] 切片大小，取值：
     * 256，表示切片大小为256*256，
     * 128，表示切片大小为128*128，
     * 64，表示切片大小为64*64。默认值为256
     * @export
     * @class Traffic
     * @extends {TileLayer}
     */
    class Traffic extends TileLayer {
      CLASS_NAME: string;

      constructor(opts?: TrafficLayerOptions);

      /**
       * 停止自动更新数据
       * @name stopFresh
       * @function
       * @instance
       * @memberof Traffic
       */
      stopFresh(): void;
    }

    /**
     * @public
     * @private
     */
    class TrafficLayer extends Layer {}

    /**
     * @public
     */
    export interface TrafficLayerOptions {
      autoRefresh?: boolean;
      interval?: number;
      zooms?: [number, number];
      opacity?: number;
      tileSize?: number;
      zIndex?: number;
      visible?: boolean;
      depthTest?: boolean;
    }

    /**
     * @public
     * @private
     */
    export const Util: {
      /**
       * @private
       * [获取回调函数唯一标记]
       * @return {}
       */
      stamp: (obj: any) => any;

      /**
       * 判断参数是否为DOM元素
       * @name isDOM
       * @param {any} obj
       * @returns {boolean}
       * @function
       * @memberof Util
       * @instance
       */
      isDOM(obj: { nodeType: number; nodeName: any }): boolean;

      /**
       * @name colorNameToHex
       *
       * @param {string} colorName
       * @returns {string} 如#FFFFFF的颜色值
       * @function
       * @memberof Util
       * @instance
       */
      colorNameToHex(colorName?: string): any;

      HSLA2RGBA(h: any, s: any, l: any, a: any): any[];
      hue2rgb(p: any, q: any, t: any): any;
      /**
       * 将16进制RGB转为rgba(R,G,B,A)
       * @name rgbHex2Rgba
       *
       * @param {string} hex
       * @returns {string}
       * @function
       * @memberof Util
       * @instance
       */
      rgbHex2Rgba(hex: string): string;
      /**
       * 将16进制RGBA转为rgba(R,G,B,A)
       * @name argbHex2Rgba
       * @param {string} hex
       * @returns {string}
       * @function
       * @memberof Util
       * @instance
       */
      argbHex2Rgba(hex: string): string;

      rgbaHex2RgbaArray(hex: string): number[];
      /**
       * 判断一个对象是否为空
       * @name isEmpty
       *
       * @param {*} obj
       * @returns {boolean}
       * @function
       * @memberof Util
       * @instance
       */
      isEmpty(obj: any): boolean;

      /**
       * 从数组删除元素
       * @name deleteItemFromArray
       * @param {*} array
       * @param {*} item
       * @function
       * @memberof Util
       * @instance
       */
      deleteItemFromArray(array: any, item: any): any[];
      /**
       * 按索引删除数组元素
       * @name deleteItemFromArrayByIndex
       * @param {*} array
       * @param {number} index
       * @function
       * @memberof Util
       * @instance
       */
      deleteItemFromArrayByIndex(array: any, index: number): any[];

      /**
       * 返回元素索引
       * @name indexOf
       * @param {*} array
       * @param {*} item
       * @returns {number}
       * @function
       * @memberof Util
       * @instance
       */
      indexOf(array: any, item: any): number;

      /**
       * 保留小数点后digits位
       * @name format
       * @param {number} num
       * @param {number} digits
       * @returns {number}
       * @function
       * @memberof Util
       * @instance
       */
      format(num: number, digits?: any): number;
      /**
       * 判断是否数组
       * @name isArray
       * @param {*} obj
       * @returns {boolean}
       * @function
       * @memberof Util
       * @instance
       */
      isArray: (array: any) => any;

      /**
       * 判断数组是否包含某个元素
       * @name includes
       * @param {any[]} array
       * @param {any} item
       * @returns {boolean}
       * @function
       * @memberof Util
       * @instance
       */
      includes: (arr: any, val: any) => any;

      /**
       * @private
       * 解析经纬度数据,使能接收Amap.LngLat对象的地方也能接收如下格式的数据：
       *   线面：
       *   [[116.368904,39.913423],[116.382122,39.901176],[116.387271,39.912501],[116.398258,39.904600]]
       *   带洞面：
       *   [外环面，内环面]
       *   点：
       *   [116.368904,39.913423]
       * @return {Object} 自定义数据类型
       */
      parseLngLatData(data: any): any;

      getTileTagByZ(z: number, optimalZoom: number, forceAll?: boolean): any;
    } & {
      requestAnimFrame: (fn: any, context?: any, immediate?: any, element?: any) => number;
      cancelAnimFrame: (id: number) => void;
      requestIdleCallback: (fn: any, options?: any) => number;
      cancelIdleCallback: (id: number) => void;
    };

    /**
     * vector
     * @public
     */
    export type Vector = number[];

    /**
     * @public
     */
    export type Vector2 = [number, number];

    /**
     * @public
     * 矢量覆盖物图层，可添加/删除/查询矢量覆盖物(Polygon/Polyline/CircleMarker/Ellipse/RectAngle/BezierCurve)的图层
     * @param {Object} opts
     * @param {boolean} [opts.visible=true] 是否显示
     * @example
     * var layer = new AMap.VectorLayer();
     * map.add(layer);
     * var circle = new AMap.circle({center: [116.4, 39.9], radius:1000});
     * layer.add(circle);
     */
    class VectorLayer extends CoreVectorLayer implements BaseLayer {
      /**
       * 	添加矢量覆盖物到集合中，不支持添加重复的覆盖物
       * @name add
       * @function
       * @param {VectorOverlay|Array<VectorOverlay>} vectors 矢量覆盖物或矢量覆盖物数组
       * @memberof VectorLayer
       * @instance
       */
      /**
       * 	删除矢量覆盖物
       * @name remove
       * @function
       * @param {VectorOverlay|Array<VectorOverlay>} vectors 矢量覆盖物或矢量覆盖物数组
       * @memberof VectorLayer
       * @instance
       */
      /**
       * 	显示图层
       * @name show
       * @function
       * @memberof VectorLayer
       * @instance
       */
      /**
       * 	隐藏图层
       * @name hide
       * @function
       * @memberof VectorLayer
       * @instance
       */
      /**
       * 判断传入的矢量覆盖物实例是否在VectorLayer这中
       * @name has
       * @param {VectorOverlay} vector
       * @returns {boolean}
       * @memberof VectorLayer
       * @instance
       */
      has(vector: any): boolean;

      /**
       * 清空 VectorLayer
       * @name clear
       * @function
       * @memberof VectorLayer
       * @instance
       */
      clear(): void;

      /**
       * 	批量修改矢量覆盖物属性(包括线样式、样色等等)
       * @name setOptions
       * @function
       * @param {Object} opt
       * @memberof VectorLayer
       * @instance
       */
      setOptions(opt: any): void;

      /**
       * 根据经纬度查询矢量覆盖物信息
       * @name query
       * @function
       * @param {LngLatLike} geometry
       * @memberof VectorLayer
       * @instance
       * @returns {VectorOverlay | undefined} vector 矢量覆盖物
       */
      query(lnglat: LngLatLike): VectorOverlay | undefined;

      /**
       * 获取 VectorOverlay 所有覆盖物显示的范围
       * @name getBounds
       * @function
       * @instance
       * @memberof VectorLayer
       * @returns {Bounds|undefined} 经纬度范围值
       */
      getBounds(): Bounds | undefined;
    }

    /**
     * @public
     * @private
     */
    abstract class VectorOverlay extends DragObject implements IVectorOverlay {
      _needUpdate: boolean;

      get CLASS_NAME(): OverlayType;

      className: OverlayType;

      visible: boolean;

      constructor();

      setMap(map: Map_2 | null): void;

      getMap(): Map_2 | null;

      abstract contains(...args: any[]): boolean;

      remove(): void;

      /**
       * 隐藏多边形
       * @name hide
       * @function
       * @memberof Polygon
       * @instance
       */
      /**
       * 隐藏折线
       * @name hide
       * @function
       * @memberof Polyline
       * @instance
       */
      /**
       * 隐藏贝塞尔线
       * @name hide
       * @function
       * @memberof BezierCurve
       * @instance
       */
      /**
       * 隐藏圆形
       * @name hide
       * @function
       * @memberof Circle
       * @instance
       */
      /**
       * 隐藏圆点
       * @name hide
       * @function
       * @memberof CircleMarker
       * @instance
       */
      /**
       * 隐藏矩形
       * @name hide
       * @function
       * @memberof Rectangle
       * @instance
       */
      /**
       * 隐藏椭圆
       * @name hide
       * @function
       * @memberof Ellipse
       * @instance
       */
      hide(): void;

      /**
       * 显示多边形
       *
       * @name show
       * @function
       * @memberof Polygon
       * @instance
       */
      /**
       * 显示折线
       *
       * @name show
       * @function
       * @memberof Polyline
       * @instance
       */
      /**
       * 显示贝塞尔曲线
       *
       * @name show
       * @function
       * @memberof BezierCurve
       * @instance
       */
      /**
       * 显示圆形
       *
       * @name show
       * @function
       * @memberof Circle
       * @instance
       */
      /**
       * 显示圆形
       *
       * @name show
       * @function
       * @memberof CircleMarker
       * @instance
       */
      /**
       * 显示圆形
       *
       * @name show
       * @function
       * @memberof Rectangle
       * @instance
       */
      /**
       * 显示圆形
       *
       * @name show
       * @function
       * @memberof Ellipse
       * @instance
       */
      show(): void;

      setDraggable(draggable: boolean): boolean;

      abstract setOptions(args?: any): void;

      getOptions(): any;

      /**
       * 获取用户自定义属性
       *
       * @name getExtData
       * @function
       * @returns {Object}
       * @memberof Polygon
       * @instance
       */
      /**
       * 获取用户自定义属性
       *
       * @name getExtData
       * @function
       * @returns {Object}
       * @memberof Polyline
       * @instance
       */
      /**
       * 获取用户自定义属性
       *
       * @name getExtData
       * @function
       * @returns {Object}
       * @memberof BezierCurve
       * @instance
       */
      /**
       * 获取用户自定义属性
       *
       * @name getExtData
       * @function
       * @returns {Object}
       * @memberof Circle
       * @instance
       */
      /**
       * 获取用户自定义属性
       *
       * @name getExtData
       * @function
       * @returns {Object}
       * @memberof CircleMarker
       * @instance
       */
      /**
       * 获取用户自定义属性
       *
       * @name getExtData
       * @function
       * @returns {Object}
       * @memberof Rectangle
       * @instance
       */
      /**
       * 获取用户自定义属性
       *
       * @name getExtData
       * @function
       * @returns {Object}
       * @memberof Ellipse
       * @instance
       */
      getExtData(): any;

      /**
       * 设置用户自定义属性，支持JavaScript API任意数据类型
       *
       * @name setExtData
       * @function
       * @param {Object} extData
       * @memberof Polygon
       * @instance
       */
      /**
       * 设置用户自定义属性，支持JavaScript API任意数据类型
       *
       * @name setExtData
       * @function
       * @param {Object} extData
       * @memberof Polyline
       * @instance
       */
      /**
       * 设置用户自定义属性，支持JavaScript API任意数据类型
       *
       * @name setExtData
       * @function
       * @param {Object} extData
       * @memberof BezierCurve
       * @instance
       */
      /**
       * 设置用户自定义属性，支持JavaScript API任意数据类型
       *
       * @name setExtData
       * @function
       * @param {Object} extData
       * @memberof Circle
       * @instance
       */
      /**
       * 设置用户自定义属性，支持JavaScript API任意数据类型
       *
       * @name setExtData
       * @function
       * @param {Object} extData
       * @memberof CircleMarker
       * @instance
       */
      /**
       * 设置用户自定义属性，支持JavaScript API任意数据类型
       *
       * @name setExtData
       * @function
       * @param {Object} extData
       * @memberof Rectangle
       * @instance
       */
      /**
       * 设置用户自定义属性，支持JavaScript API任意数据类型
       *
       * @name setExtData
       * @function
       * @param {Object} extData
       * @memberof Ellipse
       * @instance
       */
      setExtData(extData: any): void;

      getCursor(): any;

      emit(type: string, events?: any): this;

      getDraggable(): boolean;
    }

    /**
     * @public
     * @private
     * @export
     * @class VectorTraffic
     * @extends {CoreVectorTraffic}
     */
    class VectorTraffic extends TrafficLayer {
      CLASS_NAME: string;

      constructor(opts?: TrafficLayerOptions);
    }

    /**
     *
     * 用于调用 Web 服务 API，直接透传条件筛选和返回结果，提供GET和POST两种请求方式，具体请求接口和返回结果，请参考 https://lbs.amap.com/api/webservice/summary/
     * @export
     * @interface WebService
     * @public
     */
    export class WebService {
      /**
       * WebService 的回调函数类型
       *
       * @callback WebServiceCallback@callback WebServiceCallback
       * @param {string} status 服务查询的状态结果，'complete' 或 'error'
       * @param {any} data Web服务API返回的数据
       */
      /**
       * 以 GET 请求方式请求指定的 Web 服务 API 接口
       *
       * @static
       * @param {string} path Web服务API的接口路径
       * @param {object} params Web服务 API 的查询参数
       * @param {WebServiceCallback} callback 查询回调函数
       * @param {HttpOptions} opts HTTP 请求参数配置
       * @memberof WebService
       * @example
       * AMap.WebService.get('https://restapi.amap.com/v3/place/text',
       *     {
       *         keywords : '首开广场',
       *         types : '写字楼',
       *         city : '010'
       *     },function (error, result) {
       *         console.log(error, result);
       *     }
       * );
       */
      static get(path: string, params: any, callback: (status: string, data: any) => any, opts?: HttpOptions): void;

      /**
       * 以 POST 请求方式请求指定的 Web 服务 API 接口, 目前只有轨迹纠偏接口需要使用 POST 方式
       *
       * @param {string} path Web服务API的接口路径
       * @param {*} params Web服务 API 的查询参数
       * @param {WebServiceCallback} callback 查询回调函数
       * @memberof WebService
       * @example
       * AMap.WebService.post('https://restapi.amap.com/v4/grasproad/driving',
       *   [
       *       {"x":116.478928,"y":39.997761,"sp":19,"ag":0, "tm":1478031031},
       *       {"x":116.478907,"y":39.998422,"sp":10,"ag":0, "tm":2},
       *       {"x":116.479384,"y":39.998546,"sp":10,"ag":110,"tm":3},
       *       {"x":116.481053,"y":39.998204,"sp":10,"ag":120,"tm":4},
       *       {"x":116.481793,"y":39.997868,"sp":10,"ag":120,"tm":5}
       *   ],function (error, result) {
       *       console.log(error, result);
       *   }
       * );
       */
      static post(path: string, params: any, callback: (status: string, data: any) => void): void;
    }

    /**
     * 图块切片加载完成事件
     * @event complete
     * @memberof WMTS
     * @instance
     */
    /**
     * 用于加载OGC标准的WMS地图服务的一种图层类，仅支持EPSG3857坐标系统的WMS图层。 </br>
     * [查看 WMS的OGC标准](http://www.opengeospatial.org/standards/wms)。
     *
     * @param {WMSLayerOptions} opts 默认图层参数
     * @param {String} opts.url wmts服务的url地址，如：'https://services.arcgisonline.com/arcgis/rest/services/'+
     * 'Demographics/USA_Population_Density/MapServer/WMTS/'
     * @param {Boolean} opts.blend 地图级别切换时，不同级别的图片是否进行混合，如图层的图像内容为部分透明请设置为false
     * @param {Object} opts.param OGC标准的WMS地图服务的GetMap接口的参数，包括VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT等， </br>
     * CRS、BBOX、REQUEST、WIDTH、HEIGHT等参数请勿添加，例如： </br>
     * { </br>
     *     LAYERS: 'topp:states', </br>
     *     VERSION:'1.3.0', </br>
     *     FORMAT:'image/png' </br>
     * }
     * @param {[Number,Number]} [opts.zooms=[2,20]] 支持的缩放级别范围，默认范围 [2-20]
     * @param {Number} [opts.opacity=1] 透明度，默认 1
     * @param {Boolean} [opts.visible=true] 是否显示，默认 true
     * @param {Number} [opts.zIndex=4] 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
     * @class WMS
     * @extends {TileLayer}
     * @export
     * @public
     */
    class WMS extends TileLayer {
      CLASS_NAME: string;

      constructor(opts?: WMSLayerOptions);

      /**
       * 设置OGC标准的WMS getMap接口的参数，包括VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT等
       * @name setParams
       * @function
       * @param {Object} params 参数集合，{VERSION: '1.0', ...}
       * @instance
       * @memberof WMS
       */
      setParams(params: any): void;

      /**
       * 获取 OGC 标准的 WMS getMap 接口的参数
       * @name getParams
       * @function
       * @instance
       * @memberof WMS
       */
      getParams(): any;

      /**
       * 设置 WMS 服务地址
       * @name setUrl
       * @function
       * @param {String} url 服务地址
       * @instance
       * @memberof WMS
       */
      getUrl(): string | undefined;

      /**
       * 设置 WMS 服务地址
       * @name setUrl
       * @function
       * @param {String} url 服务地址
       * @instance
       * @memberof WMS
       */
      setUrl(url: string): void;
    }

    /**
     * @public
     */
    export interface WMSLayerOptions {
      url?: string;
      blend?: boolean;
      params?: any;
      zooms?: [number, number];
      opacity?: number;
      zIndex?: number;
      visible?: boolean;
    }

    /**
     * 图块切片加载完成事件
     * @event complete
     * @memberof Flexible
     * @instance
     */
    /**
     * 用于加载 OGC 标准的 WMTS 地图服务的一种图层类，仅支持 EPSG3857 坐标系统的 WMTS 图层 </br>
     * [查看 WMTS 标准](http://www.opengeospatial.org/standards/wmts) </br>
     * [相关示例](https://lbs.amap.com/api/jsapi-v2/example/thirdlayer/wmts)
     *
     * @param {WMTSLayerOptions} opts 默认图层参数
     * @param {String} opts.url wms服务的url地址，如'https://ahocevar.com/geoserver/wms'
     * @param {Boolean} opts.blend 地图级别切换时，不同级别的图片是否进行混合，如图层的图像内容为部分透明请设置为false
     * @param {Object} opts.param OGC标准的WMTS地图服务的GetTile接口的参数，包括Version、Layer、
     * Style、Format、Service等，TileMatrixSet、TileRow、TileCol、Request等参数请勿添加，例如： </br>
     * { </br>
     *     Layer: '0', </br>
     *     Version:'1.0.0', </br>
     *     Format: 'image/png' </br>
     * }
     * @param {[Number,Number]} [opts.zooms=[2,20]] 支持的缩放级别范围，默认范围 [2-20]
     * @param {Number} [opts.opacity=1] 透明度，默认 1
     * @param {Boolean} [opts.visible=true] 是否显示，默认 true
     * @param {Number} [opts.zIndex=4] 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
     * @export
     * @class WMTS
     * @extends {TileLayer}
     * @public
     */
    class WMTS extends TileLayer {
      CLASS_NAME: string;

      constructor(opts?: WMTSLayerOptions);

      /**
       * 设置 OGC 标准的 WMTS getTile接口的参数，包括Version、Layer、Style、Format、Service等
       * @name setParams
       * @function
       * @param {Object} params 参数集合，{VERSION: '1.0', ...}
       * @instance
       * @memberof WMTS
       */
      setParams(params: any): void;

      /**
       * 获取 OGC 标准的 WMTS getMap 接口的参数
       * @name getParams
       * @function
       * @instance
       * @memberof WMTS
       */
      getParams(): any;

      /**
       * 获取 WMTS 服务地址
       * @name getUrl
       * @function
       * @instance
       * @memberof WMTS
       * @returns {String} 地址
       */
      getUrl(): string | undefined;

      /**
       * 设置 WMTS 服务地址
       * @name setUrl
       * @function
       * @param {String} url 服务地址
       * @instance
       * @memberof WMTS
       */
      setUrl(url: string): void;
    }

    /**
     * @public
     */
    export interface WMTSLayerOptions {
      url?: string;
      blend?: boolean;
      params?: any;
      zooms?: [number, number];
      opacity?: number;
      zIndex?: number;
      visible?: boolean;
    }

    /**
     * 世界图层
     * @public
     * @class WorldLayer
     * @extends {DistrictLayer}
     */
    class WorldLayer extends DistrictLayer {
      CLASS_NAME: string;

      constructor(opts: DistrictLayerOptions);
    }

    /**
     * @public
     */
    export let plugin: (plugins: string | string[], cb: any) => void;
    export {};
  }
}
export {};
