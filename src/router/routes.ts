import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '', component: () => import('pages/loginPage/index.vue') }
    ]
  },
  {
    path: '/main/:userId?',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WorkSpace.vue') }]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
