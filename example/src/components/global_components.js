import FenceView from './Fence/view/index.vue';

export default {
  install(app) {
    app.component(FenceView.name, FenceView);
  },
};
