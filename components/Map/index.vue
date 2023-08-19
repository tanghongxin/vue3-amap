<template>
  <div class="a-map-map__wrapper">
    <div v-show="!state.initialized" class="a-map-map-loading">
      <div class="a-map-map-loading__wrap">
        <i class="a-map-map-loading__item a-map-map-loading__item--top" />
        <i class="a-map-map-loading__item a-map-map-loading__item--left" />
        <i class="a-map-map-loading__item a-map-map-loading__item--right" />
      </div>
    </div>
    <div ref="containerRef" class="w-100 h-100">
      <slot v-if="state.initialized" />
    </div>
  </div>
</template>

<script>
import {
  defineComponent, onBeforeUnmount, onMounted, shallowReactive, ref,
} from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import config from 'vue3-amap/src/core/config';
import { useProvideMap } from './composable';

export default defineComponent({
  name: 'AMapMap',
  setup() {
    const state = shallowReactive({
      initialized: false,
    });
    const mapState = shallowReactive({
      map: null,
      AMap: null,
    });
    const containerRef = ref(null);

    useProvideMap(mapState);

    onMounted(async () => {
      const AMap = await AMapLoader.load(config);

      const map = new AMap.Map(containerRef.value, {
        resizeEnable: true,
        zoom: 12,
      });

      map.on('complete', () => {
        state.initialized = true;
      });

      Object.assign(mapState, { AMap, map });
    });

    onBeforeUnmount(() => {
      mapState.map.destroy();
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

.a-map-map-loading {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;

  &__wrap {
    width: 60px;
    height: 60px;
    position: relative;
  }

  &__item {
    position: absolute;
    height: 12px;
    width: 12px;
    background: #40a9ff;
    border-radius: 6px;

    &--top {
      top: 0;
      left: 24px;
      animation: top 1.75s ease-in-out infinite;
    }
    &--left {
      top: 48px;
      left: 0;
      animation: left 1.75s ease-in-out infinite;
    }
    &--right {
      top: 48px;
      left: 48px;
      animation: right 1.75s ease-in-out infinite;
    }
  }
}

@keyframes top {
  0% {
    top: 0;
    left: 24px;
  }
  33.33% {
    top: 48px;
    left: 0;
  }
  66.66% {
    top: 48px;
    left: 48px;
  }
  to {
    top: 0;
    left: 24px;
  }
}
@keyframes left {
  0% {
    top: 48px;
    left: 0;
  }
  33.33% {
    top: 48px;
    left: 48px;
  }
  66.66% {
    top: 0;
    left: 24px;
  }
  to {
    top: 48px;
    left: 0;
  }
}
@keyframes right {
  0% {
    top: 48px;
    left: 48px;
  }
  33.33% {
    top: 0;
    left: 24px;
  }
  66.66% {
    top: 48px;
    left: 0;
  }
  to {
    top: 48px;
    left: 48px;
  }
}
</style>
