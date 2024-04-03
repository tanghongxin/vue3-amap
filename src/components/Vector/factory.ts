export default class Factory {
  private AMap: typeof AMap;

  private map: AMap.Map;

  constructor({ AMap, map }) {
    this.AMap = AMap;
    this.map = map;
  }

  createVector(config) {
    const { AMap } = this;

    switch (config.type) {
      // https://lbs.amap.com/api/javascript-api-v2/documentation#polyline
      case 'polygon': {
        const { points } = config;
        return new AMap.Polygon({
          path: points.split(';').map((position) => new AMap.LngLat(...position.split(',') as unknown as AMap.Vector2)),
        });
      }
      // https://lbs.amap.com/api/javascript-api-v2/documentation#circle
      case 'circle': {
        const { center, radius } = config;
        return new AMap.Circle({
          center: new AMap.LngLat(...center.split(',') as unknown as AMap.Vector2),
          radius,
        });
      }
      default: {
        throw new Error(`Unknown type ${config.type}`);
      }
    }
  }

  serializeVector(vector) {
    const { AMap } = this;
    const { constructor } = Object.getPrototypeOf(vector);

    switch (constructor) {
      case AMap.Polygon: {
        return {
          type: 'polygon',
          points: vector.getPath().map(({ lng, lat }) => `${lng},${lat}`).join(';'),
        };
      }
      case AMap.Circle: {
        const { lng, lat } = vector.getCenter();
        return {
          type: 'circle',
          center: `${lng},${lat}`,
          radius: parseInt(vector.getRadius(), 10),
        };
      }
      default: {
        throw new Error(`Unknown vector ${constructor}`);
      }
    }
  }

  createEditor(vector) {
    const { AMap, map } = this;
    const { constructor } = Object.getPrototypeOf(vector);

    switch (constructor) {
      case AMap.Polygon: {
        const editor = new AMap.PolygonEditor(map, vector);
        const { open: originalOpen, close: originalClose } = editor;

        const handleDragstart = () => {
          editor.close();
          vector._opts.draggable = true; // HACK: closeEdit 会将 draggable 置为 false
        };

        const handleDragend = () => {
          editor.open();
        };

        // 支持在微调过程中拖拽位置
        editor.open = function open(...argus) {
          setTimeout(() => {
            vector._opts.draggable = true;
            vector.on('dragstart', handleDragstart);
            vector.on('dragend', handleDragend);
          });
          return originalOpen.apply(this, argus);
        };

        editor.close = function close(...argus) {
          setTimeout(() => {
            vector._opts.draggable = false;
            vector.off('dragstart', handleDragstart);
            vector.off('dragend', handleDragend);
          });
          return originalClose.apply(this, argus);
        };

        return editor;
      }
      case AMap.Circle: {
        return new AMap.CircleEditor(map, vector);
      }
      default: {
        throw new Error(`Unknown vector ${constructor}`);
      }
    }
  }
}
