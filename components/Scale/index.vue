<script>
import {
  defineComponent, onBeforeUnmount, h, Comment,
} from 'vue';
import { useInjectMap } from 'vue3-amap/src/composables/map';

export default defineComponent({
  name: 'AMapScale',
  props: {
    position: {
      type: Object,
      default: () => ({ bottom: '50px', left: '40px' }),
    },
  },
  setup(props) {
    const { AMap, map } = useInjectMap();
    const control = new AMap.Scale({ ...props });
    map.addControl(control);

    onBeforeUnmount(() => {
      map.remove(control);
    });

    return () => h(Comment);
  },
});
</script>
