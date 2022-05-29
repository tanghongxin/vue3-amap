<script>
import {
  onBeforeUnmount, defineComponent, h, Comment, watch, computed,
} from 'vue';
import { useInjectMap } from '@/composables/map';

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
    const { lng, lat } = map.getCenter();

    const optionsRef = computed(() => {
      const { position, ...rest } = props;
      return {
        position: new AMap.LngLat(...props.position.length ? props.position : [lng, lat]),
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
      () => control.setText(optionsRef.value.text),
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
