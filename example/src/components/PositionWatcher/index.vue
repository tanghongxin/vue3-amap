<template>
  <a-map-marker v-if="position?.length" :position="position" />
  <a-map-geolocation
    watch-position
    :show-button="false"
    :show-circle="false"
    :show-marker="false"
    :pan-to-location="false"
    @update:position="$emit('update:position', (position = $event))"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'PositionWatcher' });

defineEmits(['update:position']);

const position = ref<AMap.Vector2>(null);
</script>
