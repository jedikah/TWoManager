import { RouteConfig } from 'vue-router';

const Store = require('electron-store');
const store = new Store();

let index;

if (store.get('register') === 'finished')
  index = () => import('pages/Index.vue');
else index = () => import('pages/Index0.vue');

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [{ path: '', component: index }]
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
