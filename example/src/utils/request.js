import axios from 'axios';
import { message } from 'ant-design-vue';

const request = axios.create({
  baseURL: 'https://tsapi.amap.com/v1/track',
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
