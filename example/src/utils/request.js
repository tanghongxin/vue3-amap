import axios from 'axios';
import { message } from 'ant-design-vue';
import xhrAdapter from 'axios/lib/adapters/xhr';

const request = axios.create({
  baseURL: '/geofence',
  adapter: xhrAdapter,
});

request.interceptors.response.use(
  ({ data }) => {
    const { errmsg, errdetail } = data;
    if (errmsg === 'OK') {
      return Promise.resolve(data.data);
    }
    message.error(errdetail);
    return Promise.reject(new Error(errdetail));
  },
  (error) => {
    message.error(error.message);
    return Promise.reject(error);
  },
);

export default request;
