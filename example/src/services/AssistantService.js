import { message } from 'ant-design-vue';
import BaseService from './BaseService';

class AssistantService extends BaseService {
  /**
   * 输入提示
   * @see https://lbs.amap.com/api/webservice/guide/api/inputtips
   * @param {*} param0
   * @returns
   */
  inputtips(data = {}) {
    return fetch(
      `/_AMapService/v3/assistant/inputtips?${new URLSearchParams({
        ...data,
        key: this.key,
      }).toString()}`,
      { method: 'GET' },
    )
      .then((res) => res.json())
      .then((res) => (res.info === 'OK' ? Promise.resolve(res) : Promise.reject(new Error(res.info))))
      .then((res) => res.tips)
      .catch((err) => message.error(err.message));
  }
}

export const assistantService = new AssistantService();
