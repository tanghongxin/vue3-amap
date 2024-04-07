<script lang="ts">
import {
  defineComponent, onBeforeUnmount, h, Comment,
} from 'vue';
import type { PropType } from 'vue';
import { useInjectMap } from '~/components/Map/composable';

export default defineComponent({
  name: 'AMapScale',
  props: {
    position: {
      type: Object as PropType<AMap.ControlConfig['position']>,
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
