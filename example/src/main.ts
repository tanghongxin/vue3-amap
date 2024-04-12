import { createApp } from 'vue';
import Vue3AMap from '@rthx/vue3-amap';
import { message } from 'ant-design-vue';
import App from './app.vue';
import router from './router';
import './assets/styles/main.less';

if (import.meta.env.MODE === 'development') {
  import('../mock');
}

// @ts-ignore
window._AMapSecurityConfig = {
  serviceHost: `${window.location.protocol}//${window.location.host}/_AMapService`,
};

const app = createApp(App);
app.use(router);
app.use(Vue3AMap, {
  key: import.meta.env.VITE_AMAP_JS_KEY,
  version: '2.0',
  errorHandler(error) {
    message.error(`高德地图: ${error.message}`, 5);
  },
});
app.mount('#app');
