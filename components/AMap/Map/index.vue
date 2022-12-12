<template>
  <div class="a-map-map__wrapper">
    <utils-loading :loading="!state.initialized">
      <div ref="containerRef" class="w-100 h-100">
        <slot v-if="state.initialized" />
      </div>
    </utils-loading>
  </div>
</template>

<script>
import {
  defineComponent, onBeforeUnmount, onMounted, shallowReactive, ref, getCurrentInstance,
} from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useProvideMap } from '../../../composables/map';
import UtilsLoading from '../../Utils/Loading/index.vue';

export default defineComponent({
  name: 'AMapMap',
  components: {
    UtilsLoading,
  },
  setup() {
    const state = shallowReactive({
      map: null,
      AMap: null,
      initialized: false,
    });
    const containerRef = ref(null);

    useProvideMap(state);

    onMounted(async () => {
      const { appContext } = getCurrentInstance();
      const AMap = await AMapLoader.load(appContext.config.globalProperties.$aMapOptions);

      const map = new AMap.Map(containerRef.value, {
        resizeEnable: true,
        zoom: 12,
      });

      map.on('complete', () => {
        state.initialized = true;
      });

      Object.assign(state, { AMap, map });
    });

    onBeforeUnmount(() => {
      state.map.destroy();
    });

    return { state, containerRef };
  },
});
</script>

<style lang="less">
.a-map-map__wrapper {
  width: max(100%, 100px);
  height: max(100%, 100px);
  overflow: hidden;
}
</style>
