import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/sign-in',
      component: () => import('../pages/mobile/sign-in.vue'),
    },
    {
      path: '/',
      component: () => import('../layout/PageView.vue'),
      redirect: '/manage',
      children: [
        {
          path: '/manage',
          component: () => import('../pages/manage.vue'),
        },
        {
          path: '/fence/add',
          component: () => import('../pages/fence.vue'),
        },
        {
          path: '/fence/edit',
          component: () => import('../pages/fence.vue'),
          props: true,
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
