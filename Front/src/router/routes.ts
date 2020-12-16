import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
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
          CLIENTHEADER: () => import('components/client/ClientHeader.vue'),
          CLIENTFORM: () => import('components/client/ClientForm.vue')
        }
      },

      {
        name: 'FOLDER',
        path: 'folders',
        components: {
          default: () => import('pages/Folder.vue'),
          FOLDERHEADER: () => import('components/folder/FolderHeader.vue'),
          FOLDERFORM: () => import('components/folder/FolderForm.vue')
        }
      }
    ]
  }
];

export default routes;
