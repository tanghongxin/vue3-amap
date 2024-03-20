import { ref, computed, Ref } from 'vue';

const isLoading: Ref<boolean> = ref(false);
const loadingQueue: null[] = [];

export const globalLoading = computed({
  get() {
    return isLoading.value;
  },
  set(value: boolean) {
    if (value) {
      loadingQueue.push(null);
    } else if (loadingQueue.length) {
      loadingQueue.pop();
    }

    isLoading.value = loadingQueue.length !== 0;
  },
});
