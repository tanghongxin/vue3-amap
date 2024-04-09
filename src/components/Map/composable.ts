import { provide, inject } from 'vue';
import { uuid } from '@tanghongxin/utils';

export interface AMapProvider {
  AMap: typeof AMap
  map: AMap.Map
}

interface AMapInjection extends AMapProvider {}

const key = Symbol(uuid());

export const useProvideMap = (val: AMapProvider) => provide(key, val);

export const useInjectMap = (): AMapInjection => inject(key);
