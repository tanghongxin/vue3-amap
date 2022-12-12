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

## TODO

- [ ] 发布至 NPM
- [ ] 支持 TypeScript


## Getting Started

搭建

```sh
git clone https://github.com/tanghongxin/vue3-amap.git
cd vue3-amap
pnpm i
```

启动
```sh
pnpm dev
```

构建NPM包
```sh
pnpm build
```

mock（开发阶段可选开启，避免频繁调用高德接口触发额度限制）
```
import('../mock');
```

## FAQ
- 为什么 PC 端调试定位时会失败？

  定位实现基于 GPS 与 IP 定位，前者大部分 PC 不具备硬件能力，后者受代理、外网连通性等网络环境因素影响

- 为什么 PC端 Chrome 浏览器调试定位时会失败？

  不同浏览器厂商基于 IP 定位的实现方案不同，Chrome 会向 google 发送请求解析定位，由于已知原因可能无法得到正常响应，建议在其他浏览器上进行尝试