import { provide, inject } from 'vue';
import { uuid } from 'vue3-amap/src/utils';

const key = Symbol(uuid());

export const useProvideMap = (val) => provide(key, val);

export const useInjectMap = () => inject(key);
