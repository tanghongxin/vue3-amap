import FenceView from './Fence/view/index.vue';
import PositionWatcher from './PositionWatcher/index.vue';
import AutoComplete from './AutoComplete/index.vue';

export default {
  install(app) {
    app.component(FenceView.name, FenceView);
    app.component(PositionWatcher.name, PositionWatcher);
    app.component(AutoComplete.name, AutoComplete);
  },
};
