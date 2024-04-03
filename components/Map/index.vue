<template>
  <div ref="containerRef" class="a-map-map__wrapper">
    <slot v-if="initialized" />
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount, onMounted, shallowReactive, ref, nextTick,
} from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import config from '../../src/core/config';
import { useProvideMap, AMapProvider } from './composable';
import { handleError } from '../../src/core/error';

defineOptions({ name: 'AMapMap' });

const emit = defineEmits(['complete', 'destroy']);
const mapState = shallowReactive<AMapProvider>({ AMap: null, map: null });
const initialized = ref<Boolean>(false);
const containerRef = ref<HTMLElement>(null);

useProvideMap(mapState);

onMounted(async () => {
  try {
    const AMap = await AMapLoader.load(config);
    const map = new AMap.Map(containerRef.value, {
      resizeEnable: true,
      zoom: 12,
    });

    map.on('complete', () => {
      initialized.value = true;
      emit('complete');
    });

    Object.assign(mapState, { AMap, map });
  } catch (info) {
    handleError({ info, target: '地图加载' });
  }
});

onBeforeUnmount(() => {
  // 确保子组件及地图内元素销毁完毕
  nextTick(() => {
    mapState.map?.destroy();
    emit('destroy');
  });
});
</script>

<style lang="less">
.a-map-map__wrapper {
  width: max(100%, 100px);
  height: max(100%, 100px);
  overflow: hidden;
}
</style>
