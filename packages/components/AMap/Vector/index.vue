<template>
  <div class="a-map__vector">
    <a-card v-if="!props.readOnly">
      <a-form
        :model="config"
        @submit="handleSubmit"
      >
        <a-row>
          <a-col :span="16">
            <a-form-item>
              <a-input
                v-model:value="props.config.name"
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
                v-model:value="props.config.type"
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
                v-model:value="props.config.desc"
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
                :disabled="!(config.name && config.type && vectorRef)"
              >
                保存
              </a-button>
            </a-form-item>
          </a-col>
          <template v-if="reaOnlyRef">
            <a-col
              :span="8"
              :offset="4"
            >
              <a-form-item>
                <a-button @click="start">
                  {{ vectorRef ? '继续' : '开始' }}绘制
                </a-button>
              </a-form-item>
            </a-col>
          </template>
          <template v-else>
            <a-col :span="8">
              <a-form-item>
                <a-button
                  :disabled="!(vectorRef)"
                  @click="stop"
                >
                  结束绘制
                </a-button>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item>
                <a-button
                  :disabled="!(vectorRef)"
                  @click="clear"
                >
                  清空绘制
                </a-button>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import {
  computed, defineComponent,
} from 'vue';
import Constants from 'packages/constants';
import use from './composable';

export default defineComponent({
  name: 'AMapVector',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const {
      typeRef, drawerRef, vectorRef, editorRef,
      factory,
      start,
      stop,
      clear,
      mountVector,
    } = use(props.config.type);
    const reaOnlyRef = computed(() => !(drawerRef.value || editorRef.value));
    mountVector(props.config.shape);

    const handleSubmit = async () => {
      const payload = {
        ...factory.serializeVector(vectorRef.value),
        ...props.config,
      };
      emit('submit', payload);
    };

    return {
      Constants,
      typeRef,
      drawerRef,
      vectorRef,
      editorRef,
      start,
      stop,
      clear,
      reaOnlyRef,
      handleSubmit,
      props,
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
