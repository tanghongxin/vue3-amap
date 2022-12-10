<script>
import {
  onBeforeUnmount, defineComponent, h, Comment, watch, computed,
} from 'vue';
import { useInjectMap } from 'packages/composables/map';

export default defineComponent({
  name: 'AMapMarker',
  props: {
    position: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    zIndex: {
      type: Number,
      default: 100,
    },
  },

  setup(props) {
    const { AMap, map } = useInjectMap();

    const optionsRef = computed(() => {
      const { lng, lat } = map.getCenter();
      const { position, ...rest } = props;
      return {
        position: new AMap.LngLat(...position.length ? position : [lng, lat]),
        ...rest,
      };
    });

    const control = new AMap.Marker({
      map,
      ...optionsRef.value,
    });

    map.add(control);
    map.setFitView();

    watch(
      () => props.position,
      () => control.setPosition(optionsRef.value.position),
      { deep: true },
    );

    watch(
      () => props.title,
      () => control.setTitle(optionsRef.value.title),
    );

    watch(
      () => props.zIndex,
      () => props.setzIndex(optionsRef.value.zIndex),
    );

    onBeforeUnmount(() => {
      map.remove(control);
    });

    return () => h(Comment);
  },
});
</script>
