<template>
  <div class="a-map__search" :style="props.position">
    <input
      :id="id"
      placeholder="输入地名进行搜索"
    >
  </div>
</template>

<script>
import {
  defineComponent, onBeforeUnmount, onMounted,
} from 'vue';
import { uuid } from 'vue3-amap/src/utils';
import { useInjectMap } from 'vue3-amap/src/composables/map';

export default defineComponent({
  name: 'AMapSearch',
  props: {
    position: {
      type: Object,
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
