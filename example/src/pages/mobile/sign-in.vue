<template>
  <fence-view :fences="fences">
    <a-button class="sign-in__button" shape="round" @click="handleSubmit">
      <check-outlined />签到
    </a-button>
    <position-watcher @update:position="position = $event" />
  </fence-view>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import type { PropType } from 'vue';
import { geoFenceService } from '@/services';
import { message } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import FenceView from '@/components/Fence/view/index.vue';
import PositionWatcher from '@/components/PositionWatcher/index.vue';
import { Fence } from '@/model/fence';

const props = defineProps({
  gfids: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
});

const fences = ref<Fence[]>([]);
const position = ref<AMap.Vector2>(null);

onBeforeMount(async () => {
  const { results } = await geoFenceService.list({ gfids: props.gfids });
  fences.value = results;
});

const handleSubmit = async () => {
  const isWithinFences = await geoFenceService.isWithinFences({
    location: position.value,
    gfids: props.gfids,
  });
  if (isWithinFences) {
    message.success('签到成功！');
  } else {
    message.error('签到失败，不在指定区域！');
  }
};
</script>

<style lang="less">
.sign-in__button {
  position: absolute !important;
  right: 120px;
  bottom: 90px;
  z-index: 1;
}
</style>
