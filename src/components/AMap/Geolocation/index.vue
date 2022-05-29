<script>
import {
  defineComponent, onBeforeUnmount, h, Comment,
} from 'vue';
import { useInjectMap } from '@/composables/map';
import { immediateInterval } from '@/utils';

export default defineComponent({
  name: 'AMapGeolocation',
  props: {
    watchPosition: {
      type: Boolean,
      default: false,
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    showCircle: {
      type: Boolean,
      default: true,
    },
    position: {
      type: Object,
      default: () => ({ bottom: '90px', right: '40px' }),
    },
    panToLocation: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:position'],
  setup(props, { emit }) {
    const { AMap, map } = useInjectMap();
    const geolocation = new AMap.Geolocation({ ...props });

    const getCurrentPosition = () => new Promise((resolve, reject) => {
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          resolve([
            result.position.getLng(),
            result.position.getLat(),
          ]);
        } else {
          reject(result);
        }
      });
    });

    map.addControl(geolocation);

    let timer;

    const unWatch = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const watch = () => {
      unWatch();
      timer = immediateInterval(() => {
        getCurrentPosition().then((pos) => {
          emit('update:position', pos);
        });
      }, 1000 * 5);
    };

    if (props.watchPosition) {
      watch();
    }

    onBeforeUnmount(() => {
      map.remove(geolocation);
      unWatch();
    });

    return () => h(Comment);
  },
});
</script>
