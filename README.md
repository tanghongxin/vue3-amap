# vue3-amap

基于 vue3 封装的高德地图组件集合，配合猎鹰轨迹服务搭建了简易的电子围栏管理系统与企业签到 demo

## Features:

- 原生组件封装
  - AMapControlBar
  - AMapGeolocation
  - AMapMap
  - AMapMapType
  - AMapMarker
  - AMapScale
  - AMapSearch
  - AMapToolbar
- 拓展组件
  - AMapFitView
  - AMapPositionWatcher
  - AMapVector
  - FenceView

## TODO

- [ ] 拆分实现与演示目录
- [ ] 发布至 NPM
- [ ] 支持 TypeScript
- [ ] 移除（减小）依赖（如 ant-design-vue）


## Getting Started

搭建

```sh
git clone https://github.com/tanghongxin/vue3-amap.git
cd vue3-amap
```

启动

```sh
yarn
yarn dev
```

## FAQ

- 为什么不按照[高德地图官方建议](https://lbs.amap.com/api/jsapi-v2/guide/abc/prepare)使用```serviceHost```保护安全密钥？

  经实际验证，在使用代理时，某些高德 web 服务无法得到正常响应，如定位

- 为什么 PC 端调试定位时会失败？

  定位实现基于 GPS 与 IP 定位，前者大部分 PC 不具备硬件能力，后者受代理、外网连通性等网络环境因素影响

- 为什么 PC端 Chrome 浏览器调试定位时会失败？

  不同浏览器厂商基于 IP 定位的实现方案不同，Chrome 会向 google 发送请求解析定位，由于已知原因可能无法得到正常响应，建议在其他浏览器上进行尝试