<template>
  <div class="w-100 h-100">
    <a-map-map>
      <a-map-fit-view />
      <!-- JS SKD 调用，日限额较低 -->
      <!-- <a-map-search /> -->

      <!-- Web API 调用，日限额较高 -->
      <auto-complete />
      <a-map-vector
        :ref="el => childRef = el"
        :config="config"
      >
        <a-card>
          <a-form
            :model="config"
            @submit="handleSubmit"
          >
            <a-row>
              <a-col :span="16">
                <a-form-item>
                  <a-input
                    v-model:value="config.name"
                    show-count
                    :maxlength="20"
                    placeholder="名称"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <a-select
                    v-model:value="config.type"
                    disabled
                  >
                    <a-select-option :value="Constants.DICTS.FENCE_TYPE_POLYGON">
                      多边形
                    </a-select-option>
                    <a-select-option :value="Constants.DICTS.VECTOR_TYPE_CIRCLE">
                      圆形
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-item>
                  <a-textarea
                    v-model:value="config.desc"
                    placeholder="描述"
                    allow-clear
                    :maxlength="100"
                    show-count
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col
                :span="6"
                :offset="2"
              >
                <a-form-item>
                  <a-button
                    type="primary"
                    html-type="submit"
                    :disabled="!(config.name && config.type && childRef.vectorRef)"
                  >
                    保存
                  </a-button>
                </a-form-item>
              </a-col>
              <template v-if="childRef.reaOnlyRef">
                <a-col
                  :span="8"
                  :offset="4"
                >
                  <a-form-item>
                    <a-button @click="childRef.start">
                      {{ childRef.vectorRef ? '继续' : '开始' }}绘制
                    </a-button>
                  </a-form-item>
                </a-col>
              </template>
              <template v-else>
                <a-col :span="8">
                  <a-form-item>
                    <a-button
                      :disabled="!(childRef.vectorRef)"
                      @click="childRef.stop"
                    >
                      结束绘制
                    </a-button>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item>
                    <a-button
                      :disabled="!(childRef.vectorRef)"
                      @click="childRef.clear"
                    >
                      清空绘制
                    </a-button>
                  </a-form-item>
                </a-col>
              </template>
            </a-row>
          </a-form>
        </a-card>
      </a-map-vector>

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
import { geoFenceService } from '@/services';
import { Constants } from 'vue3-amap/src/constants';
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

    const childRef = ref({});

    const handleSubmit = async () => {
      const payload = childRef.value.generateConfig();
      if (config.gfid) {
        await geoFenceService.update(payload);
        message.success('编辑成功');
      } else {
        await geoFenceService.add(payload);
        message.success('新增成功');
      }
      router.push('/manage');
    };
    return {
      Constants, config, childRef, handleSubmit,
    };
  },
});
</script>

<style lang="less">
.a-map__vector {
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 1;

  .ant-card-body {
    padding: 10px;
}

  .ant-card-bordered {
    border-radius: 4px;
  }

  .ant-form-item {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
