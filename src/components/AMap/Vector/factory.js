import Constants from '@/constants';

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
      case Constants.DICTS.FENCE_TYPE_CIRCLE: {
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
          type: Constants.DICTS.FENCE_TYPE_CIRCLE,
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
        const {
          open: originalOpen,
          close: originalClose,
        } = editor;

        // 支持在微调过程中拖拽位置
        const handleDragend = () => {
          if (editor.editable) {
            // 强制刷新顶点状态
            editor.close();
            editor.open();
          }
        };

        editor.open = function open(...argus) {
          setTimeout(() => {
            // 等同于 vector，使用运行时变量避免函数重写时可能因闭包造成的内存泄漏，下同
            // eslint-disable-next-line no-underscore-dangle
            editor.getTarget()._opts.draggable = true;
            editor.getTarget().on('dragend', handleDragend);
          });
          return originalOpen.apply(editor, argus);
        };

        editor.close = function close(...argus) {
          setTimeout(() => {
            // eslint-disable-next-line no-underscore-dangle
            editor.getTarget()._opts.draggable = false;
            editor.getTarget().off('dragend', handleDragend);
          });
          return originalClose.apply(editor, argus);
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
