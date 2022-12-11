<template>
  <div class="w-100 h-100">
    <a-map-map>
      <a-map-fit-view />
      <a-map-search />
      <a-map-vector
        :config="config"
        @submit="handleSubmit"
      />

      <a-map-toolbar />
      <a-map-scale />
      <a-map-control-bar />
      <!-- <a-map-map-type /> -->
    </a-map-map>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { defineComponent, reactive, ref } from 'vue';
import { geoFenceService } from 'example/src/services';
import Constants from 'vue3-amap/constants';
import { message } from 'ant-design-vue';

export default defineComponent({
  async setup() {
    const router = useRouter();
    const { query } = useRoute();

    const config = reactive({
      gfid: query.gfid,
      type: query.type || Constants.DICTS.VECTOR_TYPE_CIRCLE,
      name: '',
      desc: '',
    });

    if (config.gfid) {
      const res = await geoFenceService.detail(config.gfid);
      Object.assign(config, res);
    }

    const handleSubmit = async (payload) => {
      if (config.gfid) {
        await geoFenceService.update(payload);
        message.success('编辑成功');
      } else {
        await geoFenceService.add(payload);
        message.success('新增成功');
      }
      router.push('/manage');
    };

    return { config, handleSubmit };
  },
});
</script>

<style>
</style>
