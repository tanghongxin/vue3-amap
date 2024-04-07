import AMapSearch from './index.vue';
import { withInstall } from '~/utils';

export default withInstall(AMapSearch, [
  'AMap.AutoComplete',
  'AMap.PlaceSearch',
]);
