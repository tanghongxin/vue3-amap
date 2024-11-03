<template>
  <div class="w-100 h-100 preview">
    <fence-view :fences="checkedFences" />
    <a-card v-show="fences.length" class="card">
      <a-checkbox-group
        v-model:value="checkedGfids"
        :options
      />
      <a-divider />
      <div>
        <a-qrcode :value="scanUrl" :size="180" />
        <p class="sign-in">
          在手机上预览 & 签到
        </p>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {
  ref, onBeforeMount, computed,
} from 'vue';
import type { PropType } from 'vue';
import FenceView from '@/components/Fence/view/index.vue';
import { geoFenceService } from '@/services';
import { Fence } from '@/model/fence';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { RouteEnum } from '@/router/enum';

defineOptions({ name: 'Preview' });

const props = defineProps({
  gfids: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
});

const fences = ref<Fence[]>([]);

const checkedGfids = ref([...props.gfids]);
const checkedFences = computed(() => fences.value.filter(({ gfid }) => checkedGfids.value.includes(gfid)));
const options = computed(() => fences.value.map(({ name, gfid }) => ({ label: name, value: gfid })));

const router = useRouter();
const scanUrl = computed(() => {
  const { href } = router.resolve({
    path: RouteEnum.SIGN_IN,
    query: {
      gfids: checkedGfids.value,
    },
  });
  return `${window.location.origin}${import.meta.env.BASE_URL}/${href}`;
});

onBeforeMount(async () => {
  const { results } = await geoFenceService.list({});
  fences.value = results;

  // 未指定 gfids，默认全选
  if (!props.gfids.length) {
    checkedGfids.value = fences.value.map(({ gfid }) => gfid);
  }

  if (!fences.value.length) {
    message.warning('暂无围栏，请先创建');
  }

  if (checkedGfids.value.length >= 2) {
    message.info('同时预览多个相距较远的围栏时，地图将会以较高比例缩放', 6);
  }
});
</script>

<style lang="less">
.preview {
  position: relative;

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    max-height: 280px;
    padding: 2px 8px;
    overflow: auto;
  }

  .ant-checkbox-group-item {
    display: flex;
    margin: 4px 0;
    width: 100%;

    span:last-of-type {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .ant-divider {
    margin-top: 18px;
    margin-bottom: 18px;
  }

  .card {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    width: 230px;
  }

  .sign-in {
    text-align: center;
    margin: 8px;
  }
}
</style>
