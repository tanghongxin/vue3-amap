import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3AMap from 'vue3-amap';
import App from './app.vue';
import globalComponents from './components/global_components';
import router from './router';
import 'vue3-amap/style.css';
import './assets/styles/main.less';

// https://github.com/antfu/unplugin-vue-components/issues/162
import 'ant-design-vue/es/message/style/index.css';

if (import.meta.env.MODE === 'development') {
  import('../mock');
}

// eslint-disable-next-line no-underscore-dangle
window._AMapSecurityConfig = {
  serviceHost: `${window.location.protocol}//${window.location.host}/_AMapService`,
};

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Vue3AMap, {
  key: import.meta.env.VITE_AMAP_JS_KEY,
  version: '2.0',
  plugins: [
    'AMap.ToolBar',
    'AMap.Scale',
    'AMap.MouseTool',
    'AMap.MapType',
    'AMap.ControlBar',
    'AMap.Geolocation',
    'AMap.PolyEditor',
    'AMap.BezierCurveEditor',
    'AMap.RectangleEditor',
    'AMap.CircleEditor',
    'AMap.AutoComplete',
    'AMap.PlaceSearch',
  ],
});
app.use(globalComponents);
app.mount('#app');
