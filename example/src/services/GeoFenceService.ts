import { Fence, Status } from '@/model/fence';
import { AxiosInstance } from 'axios';
import req from '@/utils/request';

class GeoFenceService {
  // eslint-disable-next-line no-use-before-define
  private static instance: GeoFenceService;

  static getInstance(): GeoFenceService {
    if (!this.instance) {
      this.instance = new GeoFenceService(req, import.meta.env.VITE_AMAP_TRACK_SID);
    }
    return this.instance;
  }

  private constructor(private request: AxiosInstance, private sid: string) {}

  /**
   * 创建圆形围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t2
   * @param {*} param0
   * @returns
   */
  private addCircle({
    name = '', desc = '', center, radius,
  }: { name: string, desc?: string, center: string, radius: string }) {
    return this.request<never, { gfid: number }>({
      method: 'post',
      url: '/add/circle',
      data: new URLSearchParams({
        sid: this.sid,
        name,
        desc,
        center,
        radius,
      }).toString(),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * 更新圆形围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t6
   * @param {*} param0
   * @returns
   */
  private updateCircle({
    gfid, name = '', desc = '', center, radius,
  }: { gfid: number, name: string, desc?: string, center: string, radius: number }) {
    return this.request<never, void>({
      method: 'post',
      url: '/update/circle',
      data: new URLSearchParams({
        sid: this.sid,
        gfid: `${gfid}`,
        name,
        desc,
        center,
        radius: `${radius}`,
      }).toString(),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * 创建多边形围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t3
   * @param {*} param0
   */
  private addPolygon({
    name = '', desc = '', points,
  }: { name: string, desc?: string, points: string }) {
    return this.request<never, { gfid: number }>({
      method: 'post',
      url: '/add/polygon',
      data: new URLSearchParams({
        sid: this.sid,
        name,
        desc,
        points,
      }).toString(),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * 更新多边形围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t7
   * @param {*} param0
   */
  private updatePolygon({
    gfid, name = '', desc = '', points,
  }: { gfid: number, name: string, desc?: string, points: string }) {
    return this.request<never, void>({
      method: 'post',
      url: '/update/polygon',
      data: new URLSearchParams({
        sid: this.sid,
        gfid: `${gfid}`,
        name,
        desc,
        points,
      }).toString(),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  add({ type, ...rest }) {
    return type === 'circle' ? this.addCircle(rest) : this.addPolygon(rest);
  }

  update({ type, ...rest }) {
    return type === 'circle' ? this.updateCircle(rest) : this.updatePolygon(rest);
  }

  /**
   * 删除围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t10
   * @param {*} gfids
   * @returns
   */
  delete(gfids: number[]) {
    return this.request<never, { gfids: number[] }>({
      method: 'post',
      url: '/delete',
      data: new URLSearchParams({
        sid: this.sid,
        gfids: gfids.join(','),
      }).toString(),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * 查询围栏列表
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t11
   * @param {*} param0
   * @returns
   */
  async list({ gfids, page = 1, pagesize = 50 }: { gfids?: number[], page?: number, pagesize?: number } = {}) {
    const { results, ...rest } = await this.request<never, { count: number, results: Fence[] }>({
      method: 'get',
      url: '/list',
      params: {
        sid: this.sid,
        outputshape: '1',
        ...gfids?.length ? { gfids: gfids.join(',') } : {},
        page,
        pagesize,
      },
    });

    return {
      results: results.map((r) => {
        const type = Object.hasOwn(r.shape, 'radius') ? 'circle' : 'polygon';
        Object.assign(r, { type });
        Object.assign(r.shape, { type });
        return r;
      }),
      ...rest,
    };
  }

  /**
   * 围栏详情
   * @param {*} gfid
   * @returns
   */
  async detail(gfid: number) {
    const { results } = await this.list({ gfids: [gfid] });
    if (results.length) {
      return results[0];
    }
    return null;
  }

  /**
   * 查询指定坐标与围栏关系
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/fence_status#t3
   * @param {*} param0
   * @returns
   */
  private statusByLocation({
    location, gfids, page = 1, pagesize = 50,
  }: { location: number[], gfids?: number[], page?: number, pagesize?: number }) {
    return this.request<never, { count: number, results: Status[] }>({
      method: 'get',
      url: '/status/location',
      params: {
        sid: this.sid,
        location: location.join(','),
        ...gfids?.length ? { gfids: gfids.join(',') } : {},
        page,
        pagesize,
      },
    });
  }

  /**
   * 查询指定坐标是否在指定围栏内
   * @param {*} param0
   * @returns
   */
  async isWithinFences({ location, gfids }: { location: number[], gfids?: number[] }) {
    const { results } = await this.statusByLocation({ location, gfids });
    return results.find((r) => `${r.in}` === '1');
  }
}

export const geoFenceService = GeoFenceService.getInstance();
