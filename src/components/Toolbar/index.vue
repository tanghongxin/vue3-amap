<script lang="ts">
import { defineComponent, onBeforeUnmount, h, Comment } from 'vue';
import type { PropType } from 'vue';
import { useInjectMap } from '~/components/Map/composable';

export default defineComponent({
  name: 'AMapToolbar',
  props: {
    position: {
      type: Object as PropType<AMap.ControlConfig['position']>,
      default: () => ({ top: '40px', left: '40px' }),
    },
  },
  setup(props) {
    const { AMap, map } = useInjectMap();
    const control = new AMap.ToolBar({ ...props });
    map.addControl(control);

    onBeforeUnmount(() => {
      map.remove(control);
    });

    return () => h(Comment);
  },
});
</script>
