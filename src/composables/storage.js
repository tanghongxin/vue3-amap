import { ref, computed } from 'vue';

const useStorage = (storage) => (key, defaultValue) => ref(computed({
  get() {
    let value = defaultValue;
    try {
      value = JSON.parse(storage.getItem(key));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
    }

    return value;
  },
  set(value) {
    storage.setItem(key, JSON.stringify(value));
  },
}));

export const useLocalStorage = useStorage(localStorage);

export const useSessionStorage = useStorage(sessionStorage);
