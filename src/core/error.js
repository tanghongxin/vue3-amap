/* eslint-disable no-console */
import config from './config';

// https://lbs.amap.com/api/webservice/guide/tools/info
export const ERR_DESC_MAP = Object.freeze({
  INVALID_USER_KEY: 'key不正确或过期',
  SERVICE_NOT_AVAILABLE: '没有权限使用相应的服务或者请求接口的路径拼写错误',
  DAILY_QUERY_OVER_LIMIT: '访问已超出日访问量',
  ACCESS_TOO_FREQUENT: '单位时间内访问过于频繁',
  INVALID_USER_IP: 'IP白名单出错,发送请求的服务器IP不在IP白名单内',
  INVALID_USER_DOMAIN: '绑定域名无效',
  INVALID_USER_SIGNATURE: '数字签名未通过验证',
  INVALID_USER_SCODE: 'MD5安全码未通过验证',
  USERKEY_PLAT_NOMATCH: '请求key与绑定平台不符',
  IP_QUERY_OVER_LIMIT: 'IP访问超限',
  NOT_SUPPORT_HTTPS: '服务不支持https请求',
  INSUFFICIENT_PRIVILEGES: '权限不足,服务请求被拒绝',
  USER_KEY_RECYCLED: 'Key被删除',
  GATEWAY_TIMEOUT: '受单机QPS限流限制',
  SERVER_IS_BUSY: '服务器负载过高',
  RESOURCE_UNAVAILABLE: '所请求的资源不可用',
  CQPS_HAS_EXCEEDED_THE_LIMIT: '使用的某个服务总QPS超限',
  CKQPS_HAS_EXCEEDED_THE_LIMIT: '某个Key使用某个服务接口QPS超出限制',
  CUQPS_HAS_EXCEEDED_THE_LIMIT: '账号使用某个服务接口QPS超出限制',
  INVALID_REQUEST: '账号处于被封禁状态',
  ABROAD_DAILY_QUERY_OVER_LIMIT: '某个Key的QPS超出限制',
  NO_EFFECTIVE_INTERFACE: '请求的接口权限过期',
  USER_DAILY_QUERY_OVER_LIMIT: '账号维度日调用量超出限制',
  USER_ABROAD_DAILY_QUERY_OVER_LIMIT: '账号维度海外服务日调用量超出限制',
  INVALID_PARAMS: '请求参数非法',
  MISSING_REQUIRED_PARAMS: '缺少必填参数',
  ILLEGAL_REQUEST: '请求协议非法',
  UNKNOWN_ERROR: '其他未知错误',
  INSUFFICIENT_ABROAD_PRIVILEGES: '查询坐标或规划点(包括起点、终点、途经点)在海外,但没有海外地图权限',
  ILLEGAL_CONTENT: '查询信息存在非法内容',
  OUT_OF_SERVICE: '规划点(包括起点、终点、途经点)不在中国陆地范围内',
  NO_ROADS_NEARBY: '划点(起点、终点、途经点)附近搜不到路',
  ROUTE_FAIL: '路线计算失败,通常是由于道路连通关系导致',
  OVER_DIRECTION_RANGE: '起点终点距离过长。',
  ENGINE_RESPONSE_DATA_ERROR: '服务响应失败。',
  QUOTA_PLAN_RUN_OUT: '余额耗尽',
  GEOFENCE_MAX_COUNT_REACHED: '围栏个数达到上限',
  SERVICE_EXPIRED: '购买服务到期',
  ABROAD_QUOTA_PLAN_RUN_OUT: '海外服务余额耗尽',
});

function logError(error) {
  console.error(error);
  console.trace();
}

export function handleError({ info, target = '' }) {
  const error = new Error(
    `${target ? `[${target}]` : ''}[${info}]${ERR_DESC_MAP[info]}`,
  );

  if (config.errorHandler) {
    try {
      config.errorHandler.call(null, error);
    } catch (e) {
      if (e !== error) logError(e);
    }
  }

  logError(error);
}
