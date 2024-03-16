import AMapSearch from './index.vue';
import { withInstall } from '../../src/utils';

export default withInstall(AMapSearch, [
  'AMap.AutoComplete',
  'AMap.PlaceSearch',
]);
