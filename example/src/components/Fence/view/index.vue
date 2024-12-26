<template>
  <div class="w-100 h-100">
    <a-map-map>
      <slot />
      <a-map-fit-view />
      <a-map-vector
        v-for="config in fences"
        :key="config.gfid"
        :config="config"
      />
    </a-map-map>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { Fence } from '@/model/fence';

defineOptions({
  name: 'FenceView',
});

defineProps({
  fences: {
    type: Array as PropType<Fence[]>,
    default: () => [],
  },
});
</script>

<style></style>
