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

打包
```sh
pnpm build
```

mock（开发阶段可选开启，避免频繁调用高德接口触发额度限制）
```javascript
import('../mock');
```

## Tips
地图加载与接口调用涉及高德开发者密钥，出于安全考虑，项目采用 Nginx 转发的处理方式进行处理，实际开发时请前往[高德控制台](https://console.amap.com/dev/index)申请自己的开发者应用

### Nginx 代理示例
```nginx
location /_AMapService/v4/map/styles {
  set $args "$args&jscode={安全密钥}";
  proxy_pass https://webapi.amap.com/v4/map/styles;
}

location /_AMapService/v3/vectormap {
  set $args "$args&jscode={安全密钥}";
  proxy_pass https://fmap01.amap.com/v3/vectormap;
}

location /_AMapService/ {
  set $args "$args&jscode={安全密钥}";
  proxy_pass https://restapi.amap.com/;
}

location /geofence/ {
  set $args "$args&key={key}";
  proxy_pass https://tsapi.amap.com/v1/track/geofence/;
}
```

## FAQ
- 为什么 PC 调试定位时会失败？

  定位实现基于 GPS 与 IP，前者大部分 PC 不具备硬件能力，后者受网络环境因素影响

- 为什么 Chrome 调试定位时会失败？

  不同浏览器厂商的定位实现方案有所不同，Chrome 向 Google 发送请求解析定位，由于已知原因可能无法得到正常响应，建议在其他浏览器上进行尝试