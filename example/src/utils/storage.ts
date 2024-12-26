import { customRef } from 'vue';

const useStorage = (storage: Storage) => (key: string, defaultValue: unknown) =>
  customRef((track, trigger) => ({
    get() {
      let value = defaultValue;
      try {
        value = JSON.parse(storage.getItem(key));
      } catch (e) {
        console.warn(e);
      }

      track();
      return value;
    },
    set(value) {
      trigger();
      storage.setItem(key, JSON.stringify(value));
    },
  }));

export const useLocalStorage = useStorage(localStorage);

export const useSessionStorage = useStorage(sessionStorage);
