<template>
  <a-map-marker
    v-if="state.position.length"
    :position="state.position"
  />
  <a-map-geolocation
    watch-position
    :show-button="false"
    :show-circle="false"
    :show-marker="false"
    :pan-to-location="false"
    @update:position="$emit('update:position', state.position = $event)"
  />
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'AMapPositionWatcher',
  emits: ['update:position'],
  setup() {
    return {
      state: reactive({ position: [] }),
    };
  },
});
</script>

<style lang="less">

</style>
