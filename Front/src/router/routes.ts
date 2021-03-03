import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
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
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'CLIENT',
        path: '',
        components: {
          default: () => import('pages/Client.vue'),
          header: () => import('components/client/ClientHeader.vue'),
          form: () => import('components/client/ClientForm.vue')
        }
      },

      {
        name: 'FOLDER',
        path: 'folders',
        components: {
          default: () => import('pages/Folder.vue'),
          header: () => import('components/folder/FolderHeader.vue'),
          form: () => import('components/folder/FolderForm.vue')
        }
      },

      {
        name: 'MODEL',
        path: 'models',
        components: {
          default: () => import('pages/Model.vue'),
          header: () => import('components/model/ModelHeader.vue')
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
