import { onBeforeUnmount, ref, shallowRef } from 'vue';
import { useInjectMap } from '~/components/Map/composable';
import Factory from './factory';

const DEFAULT_DRAW_STYLE = {
  fillColor: '#00b0ff',
  strokeColor: '#80d8ff',
};

export default function use(type: string) {
  const { AMap, map } = useInjectMap();
  const factory = new Factory({ AMap, map });

  const typeRef = ref<string>(type);
  const drawerRef = shallowRef<AMap.MouseTool | null>(null);
  const vectorRef = shallowRef<AMap.Polygon | AMap.Circle>(null);
  const editorRef = shallowRef<AMap.PolygonEditor | AMap.CircleEditor>(null);

  const startAdjust = () => {
    editorRef.value = factory.createEditor(vectorRef.value);
    editorRef.value.open();
  };

  const stopAdjust = () => {
    if (editorRef.value) {
      editorRef.value.close();
      editorRef.value = null;
    }
  };

  const stopDraw = (ifClear = false) => {
    if (drawerRef.value) {
      drawerRef.value.close(ifClear);
      drawerRef.value = null;
    }
  };

  const startDraw = () => {
    drawerRef.value = new AMap.MouseTool(map);
    drawerRef.value[typeRef.value](DEFAULT_DRAW_STYLE);

    drawerRef.value.on('draw', ({ obj }) => {
      vectorRef.value = obj;
      map.setFitView();
      stopDraw();
      startAdjust();
    });
  };

  const start = () => {
    if (vectorRef.value) {
      startAdjust();
    } else {
      startDraw();
    }
  };

  const stop = (ifClear = false) => {
    stopAdjust();
    stopDraw(ifClear);
  };

  const mountVector = (config) => {
    typeRef.value = config.type;
    vectorRef.value = factory.createVector(config);
    map.add(vectorRef.value);
    map.setFitView();
  };

  const reStart = () => {
    if (vectorRef.value) {
      map.remove(vectorRef.value);
      vectorRef.value = null;
    }

    stop(true);
    start();
  };

  const setType = (val) => {
    typeRef.value = val;
    reStart();
  };

  onBeforeUnmount(() => {
    if (drawerRef.value) {
      map.remove(drawerRef.value);
    }
    if (vectorRef.value) {
      map.remove(vectorRef.value);
    }
    map.setFitView();
  });

  return {
    typeRef,
    drawerRef,
    vectorRef,
    editorRef,

    factory,
    start,
    stop,
    clear: reStart,
    setType, // 高德地图不支持矢量图类型直接转换，需后端建业务表中转支持
    mountVector,
  };
}
