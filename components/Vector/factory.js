import Constants from '../../constants';

export default class Factory {
  constructor({ AMap, map }) {
    this.AMap = AMap;
    this.map = map;
  }

  createVector({
    type, center, radius, points,
  }) {
    const { AMap } = this;

    switch (type) {
      case Constants.DICTS.FENCE_TYPE_POLYGON: {
        return new AMap.Polygon({
          path: points.split(';').map((position) => new AMap.LngLat(...position.split(','))),
        });
      }
      case Constants.DICTS.VECTOR_TYPE_CIRCLE: {
        return new AMap.Circle({
          center: new AMap.LngLat(...center.split(',')),
          radius,
        });
      }
      default: {
        throw new Error(`Unknown type ${type}`);
      }
    }
  }

  serializeVector(vector) {
    const { AMap } = this;
    const { constructor } = Object.getPrototypeOf(vector);

    switch (constructor) {
      case AMap.Polygon: {
        return {
          type: Constants.DICTS.FENCE_TYPE_POLYGON,
          points: vector.getPath().map(({ lng, lat }) => `${lng},${lat}`).join(';'),
        };
      }
      case AMap.Circle: {
        // eslint-disable-next-line no-case-declarations
        const { lng, lat } = vector.getCenter();
        return {
          type: Constants.DICTS.VECTOR_TYPE_CIRCLE,
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
        const editor = new AMap.PolyEditor(map, vector);
        const { open: originalOpen, close: originalClose } = editor;

        const handleDragstart = () => {
          editor.closeEdit();
          vector._opts.draggable = true; // HACK: closeEdit 会将 draggable 置为 false
        };

        const handleDragend = () => {
          editor.openEdit();
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
