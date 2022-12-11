import Adaptor from 'axios-mock-adapter';
import request from 'example/src/utils/request';

const adaptor = new Adaptor(request, { delayResponse: 300 });

adaptor.onGet(/\/geofence\/list/).reply((config) => [200, {
  data: {
    count: 2,
    results: [
      {
        createtime: 1669106529587,
        desc: '圆形围栏',
        gfid: 860198,
        modifytime: 1670037283577,
        name: '太保大厦',
        shape: {
          center: '104.063117,30.545776',
          radius: 121,
        },
      },
      {
        createtime: 1669106580791,
        desc: '多边形围栏',
        gfid: 861057,
        modifytime: 1669106580791,
        name: '腾讯大厦B座',
        shape: {
          points: '104.060766,30.546719;104.062048,30.546745;104.062018,30.544752;104.060781,30.544759;104.060705,30.546438;104.060766,30.546719',
        },
      },
    ].filter(({ gfid }) => (config.params.gfids ? config.params.gfids === `${gfid}` : true)),
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
    results: [{ gfid: 860198, gfname: '太保大厦', in: 0 }, { gfid: 861057, gfname: '腾讯大厦B座', in: 0 }],
  },
  errcode: 10000,
  errdetail: null,
  errmsg: 'OK',
}]);

adaptor.onAny().passThrough();
