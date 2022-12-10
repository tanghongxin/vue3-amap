<template>
  <div id="sign-in">
    <fence-view :fences="state.fences">
      <a-button
        class="sign-in__button"
        shape="round"
        :loading="state.loading"
        @click="handleSubmit"
      >
        <check-outlined />签到
      </a-button>
      <a-map-position-watcher
        @update:position="state.position = $event"
      />
    </fence-view>
  </div>
</template>

<script>
import {
  defineComponent, reactive, onBeforeMount,
} from 'vue';
import { geoFenceService } from 'packages/services';
import { message } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    CheckOutlined,
  },
  setup() {
    const state = reactive({ fences: [], position: [], loading: false });

    onBeforeMount(async () => {
      const { results } = await geoFenceService.list();
      state.fences = results;
    });

    const handleSubmit = async () => {
      try {
        state.loading = true;
        const isWithinFences = await geoFenceService.isWithinFences({
          location: state.position,
          gfids: state.fences.map(({ gfid }) => gfid), // 默认所有围栏均启用
        });
        if (isWithinFences) {
          message.success('签到成功！');
        } else {
          message.error('签到失败，不在指定区域！');
        }
      } finally {
        state.loading = false;
      }
    };

    return {
      state, handleSubmit,
    };
  },
});
</script>

<style lang="less">
#sign-in {
  width: 100vw;
  height: 100vh;
}

.sign-in__button {
  position: absolute !important;
  right: 120px;
  bottom: 90px;
  z-index: 1;
}
</style>
