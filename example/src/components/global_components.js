import FenceView from './Fence/view/index.vue';
import PositionWatcher from './PositionWatcher/index.vue';

export default {
  install(app) {
    app.component(FenceView.name, FenceView);
    app.component(PositionWatcher.name, PositionWatcher);
  },
};
