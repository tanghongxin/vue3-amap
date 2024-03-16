<template>
  <div class="a-map__search" :style="props.position">
    <input
      :id="id"
      placeholder="输入地名进行搜索"
    >
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onBeforeUnmount, onMounted,
} from 'vue';
import type { PropType } from 'vue';
import { uuid } from '../../src/utils';
import { handleError } from '../../src/core/error';
import { useInjectMap } from '../Map/composable';

export default defineComponent({
  name: 'AMapSearch',
  props: {
    position: {
      type: Object as PropType<AMap.ControlConfig['position']>,
      default: () => ({ top: '40px', left: '90px' }),
    },
  },
  setup(props) {
    const id = `a-map__search${uuid()}`;
    const { AMap, map } = useInjectMap();
    let autoComplete;
    let placeSearch;

    onMounted(() => {
      autoComplete = new AMap.Autocomplete({ input: id });
      placeSearch = new AMap.PlaceSearch({ map });

      autoComplete.on('select', (e) => {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);
      });

      autoComplete.on('error', ({ info }) => handleError({ info, target: '输入提示' }));
      placeSearch.on('error', ({ info }) => handleError({ info, target: '搜索服务' }));
    });

    onBeforeUnmount(() => {
      map.remove(autoComplete);
      map.remove(placeSearch);
    });

    return { props, id };
  },
});
</script>

<style lang="less">
.a-map__search {
  position: absolute;
  z-index: 1;
}
</style>
