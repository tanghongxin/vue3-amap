import { provide, inject } from 'vue';
import { uuid } from 'packages/utils';

const key = Symbol(uuid());

export const useProvideMap = (val) => provide(key, val);

export const useInjectMap = () => inject(key);
