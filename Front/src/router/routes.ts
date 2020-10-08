import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },

  // // Always leave this as last one,
  // // but you can also remove it
  // {
  //   path: '*',
  //   component: () => import('pages/Error404.vue')
  // }

  {
    name: 'SIMPLE',
    path: '/',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      {
        name: 'LOGIN',
        path: '',
        component: () => import('pages/Authentification.vue')
      }
    ]
  },
  {
    name: 'MAIN',
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'CLIENT', path: '', component: () => import('pages/Client.vue') }
    ]
  }
];

export default routes;
