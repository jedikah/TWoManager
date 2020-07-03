import { RouteConfig } from 'vue-router';

const Store = require('electron-store');
const store = new Store();

let index, simpleLayout;

if (store.get('register') === 'finished') {
  index = () => import('pages/Index.vue');
  simpleLayout = () => import('layouts/SimpleLayout.vue');
} else {
  index = () => import('pages/Index0.vue');
  simpleLayout = () => import('layouts/SimpleLayout0.vue');
}

const routes: RouteConfig[] = [
  {
    path: '/',
    component: simpleLayout,
    children: [{ path: '', component: index }]
  },
  {
    path: '/main',
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
