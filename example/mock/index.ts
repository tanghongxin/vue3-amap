/* eslint-disable max-len */
import Adaptor from 'axios-mock-adapter';
import request from '@/utils/request';
import { message } from 'ant-design-vue';

const adaptor = new Adaptor(request, { delayResponse: 600 });

adaptor.onGet(/\/geofence\/list/).reply((config) => [200, {
  data: {
    count: 2,
    results: [
      {
        gfid: 1175854,
        name: '成都阿里',
        desc: '圆形围栏示例',
        shape: {
          center: '104.06155,30.54185',
          radius: 69,
        },
        createtime: 1706976434979,
        modifytime: 1709877039724,
      },
      {
        gfid: 1177056,
        name: '成都腾讯',
        desc: '多边形围栏示例',
        shape: {
          points: '104.062227,30.548188;104.063946,30.548182;104.064235,30.546936;104.062227,30.546909;104.062023,30.546734;104.061757,30.544765;104.060708,30.544765;104.060702,30.546807;104.062008,30.546816;104.062212,30.548194;104.062227,30.548188',
        },
        createtime: 1708417723998,
        modifytime: 1709877052019,
      },
      {
        gfid: 1181968,
        name: '上海湖北路',
        desc: '路线-多边形围栏示例',
        shape: {
          points: '121.478337,31.235534;121.47953,31.234796;121.480202,31.234295;121.48092,31.233238;121.481197,31.232675;121.481263,31.232179;121.481342,31.232196;121.481315,31.232715;121.480327,31.234337;121.479751,31.234752;121.479625,31.234816;121.478461,31.235527;121.478337,31.235534',
        },
        createtime: 1709876981636,
        modifytime: 1709877099599,
      },
      {
        gfid: 1182548,
        name: '上海北京东路',
        desc: '路线-多边形围栏示例',
        shape: {
          points: '121.483626,31.240518;121.482139,31.240223;121.479115,31.239215;121.473602,31.237817;121.473651,31.237662;121.479097,31.238998;121.482255,31.240025;121.483522,31.240307;121.483626,31.240518',
        },
        createtime: 1709877396546,
        modifytime: 1709877402768,
      },
      {
        gfid: 1184563,
        name: '北京积水潭地铁站',
        desc: '',
        shape: {
          center: '116.373404,39.948581',
          radius: 143,
        },
        createtime: 1710410114690,
        modifytime: 1710410114690,
      },
      {
        gfid: 1184926,
        name: '北京后海',
        desc: '',
        shape: {
          points: '116.380986,39.945465;116.380602,39.943597;116.38206,39.94273;116.385607,39.94173;116.386393,39.940569;116.387525,39.940098;116.393239,39.938981;116.39345,39.939084;116.390689,39.939996;116.386182,39.943509;116.384955,39.943656;116.383344,39.944582;116.381446,39.94545;116.380928,39.945479;116.380986,39.945465',
        },
        createtime: 1710410184643,
        modifytime: 1710410184643,
      },
    ].filter(({ gfid }) => {
      const gfids = config.params.gfids?.length ? config.params.gfids.split(',') : [`${gfid}`];
      return gfids.includes(`${gfid}`);
    }),
  },
  errcode: 10000,
  errdetail: null,
  errmsg: 'OK',
}]);

adaptor.onPost(/\/geofence\/add/).reply(() => [200, {
  data: null, errcode: 10000, errdetail: null, errmsg: 'OK',
}]);

adaptor.onPost(/\/geofence\/update/).reply(() => [200, {
  data: null, errcode: 10000, errdetail: null, errmsg: 'OK',
}]);

adaptor.onPost(/\/geofence\/delete/).reply(() => [200, {
  data: { gfids: [871500] }, errcode: 10000, errdetail: null, errmsg: 'OK',
}]);

adaptor.onGet(/\/geofence\/status\/location/).reply(() => [200, {
  data: {
    count: 2,
    results: [{ gfid: 1175854, gfname: '太保大厦', in: 0 }, { gfid: 1177056, gfname: '腾讯大厦B座', in: 0 }],
  },
  errcode: 10000,
  errdetail: null,
  errmsg: 'OK',
}]);

adaptor.onAny().passThrough();

setTimeout(message.info, 300, 'mock 已开启，调试数据不具备准确性');
