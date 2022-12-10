import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3AMap from 'vue3-amap';
import App from './app.vue';
import router from './router';
import 'vue3-amap/style.css';
import './assets/styles/main.less';

// https://github.com/antfu/unplugin-vue-components/issues/162
import 'ant-design-vue/es/message/style/index.css';

if (import.meta.env.MODE === 'development') {
  import('../mock');
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Vue3AMap);
app.mount('#app');
