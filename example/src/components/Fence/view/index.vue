<template>
  <div class="w-100 h-100">
    <a-map-map>
      <slot />
      <a-map-fit-view />
      <a-map-vector
        v-for="(config, index) in props.fences"
        :key="index"
        :config="config"
      />
    </a-map-map>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FenceView',
  props: {
    fences: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return { props };
  },
});
</script>

<style>
</style>
