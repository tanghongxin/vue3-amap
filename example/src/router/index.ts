import { createRouter, createWebHashHistory } from 'vue-router';
import { toArray } from '@/utils/index';
import { RouteEnum } from '@/router/enum';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: RouteEnum.SIGN_IN,
      component: () => import('../pages/mobile/sign-in.vue'),
      props: (route) => ({
        gfids: toArray(route.query.gfids).map(Number),
      }),
    },
    {
      path: '/',
      component: () => import('../layout/PageView.vue'),
      redirect: RouteEnum.MANAGE,
      children: [
        {
          path: RouteEnum.MANAGE,
          component: () => import('../pages/manage.vue'),
        },
        {
          path: RouteEnum.PREVIEW,
          component: () => import('../pages/preview.vue'),
          props: (route) => ({
            gfids: toArray(route.query.gfids).map(Number),
          }),
        },
        {
          path: RouteEnum.FENCE_ADD,
          component: () => import('../pages/fence.vue'),
          props: (route) => ({
            type: route.query.type,
          }),
        },
        {
          path: RouteEnum.FENCE_EDIT,
          component: () => import('../pages/fence.vue'),
          props: (route) => ({
            type: route.query.type,
            gfid: ~~route.query.gfid,
          }),
        },
      ],
    },
    {
      path: '/:path(.*)',
      component: () => import('../pages/not-found.vue'),
    },
  ],
});

export default router;
