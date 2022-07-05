<template>
  <div v-show="$props.loading" class="utils-loading">
    <div class="utils-loading__wrap">
      <i class="utils-loading__item utils-loading__item--top" />
      <i class="utils-loading__item utils-loading__item--left" />
      <i class="utils-loading__item utils-loading__item--right" />
    </div>
  </div>
  <slot />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UtilsLoading',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="less">
.utils-loading {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;

  &__wrap {
    width: 60px;
    height: 60px;
    position: relative;
  }

  &__item {
    position: absolute;
    height: 12px;
    width: 12px;
    background: #40a9ff;
    border-radius: 6px;

    &--top {
      top: 0;
      left: 24px;
      animation: top 1.75s ease-in-out infinite;
    }
    &--left {
      top: 48px;
      left: 0;
      animation: left 1.75s ease-in-out infinite;
    }
    &--right {
      top: 48px;
      left: 48px;
      animation: right 1.75s ease-in-out infinite;
    }
  }
}

@keyframes top {
  0% {
    top: 0;
    left: 24px;
  }
  33.33% {
    top: 48px;
    left: 0;
  }
  66.66% {
    top: 48px;
    left: 48px;
  }
  to {
    top: 0;
    left: 24px;
  }
}
@keyframes left {
  0% {
    top: 48px;
    left: 0;
  }
  33.33% {
    top: 48px;
    left: 48px;
  }
  66.66% {
    top: 0;
    left: 24px;
  }
  to {
    top: 48px;
    left: 0;
  }
}
@keyframes right {
  0% {
    top: 48px;
    left: 48px;
  }
  33.33% {
    top: 0;
    left: 24px;
  }
  66.66% {
    top: 48px;
    left: 0;
  }
  to {
    top: 48px;
    left: 48px;
  }
}
</style>
