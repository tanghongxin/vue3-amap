<template>
  <div class="w-100 h-100">
    <a-map-map>
      <a-map-fit-view />
      <a-map-search />
      <a-map-vector v-bind="query" @success="() => router.push('/manage')" />

      <a-map-toolbar />
      <a-map-scale />
      <a-map-control-bar />
      <!-- <a-map-map-type /> -->
    </a-map-map>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { query } = useRoute();
    return { router, query };
  },
});
</script>

<style>
</style>
