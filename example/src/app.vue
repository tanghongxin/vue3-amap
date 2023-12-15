<template>
  <Suspense>
    <a-config-provider :locale="zhCN">
      <router-view />
    </a-config-provider>
  </Suspense>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>
