<template>
  <Suspense>
    <a-config-provider :locale="zhCN">
      <a-spin :spinning="globalLoading" class="global-loading">
        <div class="vw-100 vh-100">
          <router-view />
        </div>
      </a-spin>
    </a-config-provider>
  </Suspense>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { Spin } from 'ant-design-vue';
import { globalLoading } from '@/utils/share';
import { h } from 'vue';

Spin.setDefaultIndicator({
  indicator: h('div', { class: 'loader-wrap' }, [
    h('div', { class: 'loader' }),
  ]),
});
</script>

<style lang="less">
.global-loading {
  bottom: 0;
  height: 100vh !important;
  max-height: 100vh !important;
}
</style>
