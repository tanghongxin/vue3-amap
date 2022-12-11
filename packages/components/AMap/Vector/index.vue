<template>
  <div class="a-map__vector">
    <slot />
  </div>
</template>

<script>
import {
  computed, defineComponent,
} from 'vue';
import use from './composable';

export default defineComponent({
  name: 'AMapVector',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { expose }) {
    const {
      drawerRef, vectorRef, editorRef,
      factory,
      start,
      stop,
      clear,
      mountVector,
    } = use(props.config.type);
    const reaOnlyRef = computed(() => !(drawerRef.value || editorRef.value));

    if (props.config.shape) {
      mountVector(props.config.shape);
    }

    const generateConfig = () => ({
      ...factory.serializeVector(vectorRef.value),
      ...props.config,
    });

    expose({
      start, stop, clear, vectorRef, reaOnlyRef, generateConfig,
    });
  },
});
</script>

<style lang="less">
</style>
