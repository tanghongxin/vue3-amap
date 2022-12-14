<template>
  <div class="a-map-fit-view" :style="props.position">
    <button class="a-map-fit-view__btn" @click="map.setFitView()">
      <navigation-icon />
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useInjectMap } from '../Map/composable';
import NavigationIcon from './navigation.svg';

export default defineComponent({
  name: 'AMapFitView',
  components: {
    NavigationIcon,
  },
  props: {
    position: {
      type: Object,
      default: () => ({ bottom: '90px', right: '80px' }),
    },
  },
  setup(props) {
    const { map } = useInjectMap();

    return { props, map };
  },
});
</script>

<style lang="less">
.a-map-fit-view {
  position: absolute;
  z-index: 1;

  &__btn {
    line-height: 1;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    box-shadow: 0 2px #00000004;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    color: #000000d9;
    border-color: #d9d9d9;
    background: #fff;
    min-width: 32px;
    padding-right: 0;
    padding-left: 0;
    border-radius: 50%;

    &:hover,
    &:focus {
      color:  #40a9ff;
      border-color:#40a9ff;
      background: #fff;
    }
  }
}
</style>
