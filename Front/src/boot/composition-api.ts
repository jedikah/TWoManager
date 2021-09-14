import { boot } from 'quasar/wrappers';
import { apolloClient } from 'src/services/applloClient';
import { notifyThis } from 'src/services/context';
import {
  initState,
  state as sessionState,
} from 'src/services/session/useSession';

import { DefaultApolloClient } from '@vue/apollo-composable';

import { checkToken } from '../services/users/checkToken';

export default boot(({ app, router }) => {
  // const options = {
  //   name: '_blank',
  //   specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
  //   styles: [
  //     'http://localhost:8080/#/modelView.min.css',
  //     'https://cdn.jsdelivr.net/npm/quasar@1.14.7/dist/quasar.min.css',

  //   ],
  // };

  // app.use(VueHtmlToPaper, options);
  app.provide(DefaultApolloClient, apolloClient);

  // // BEFORE EACH
  router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token');

    if (token) {
      const data = await checkToken(token);
      if (data) {
        sessionState.session = true;
        sessionState.currentUser = data;

        if (to.path === '/') next('/main');
      } else {
        sessionState.session = initState.session;
        sessionState.currentUser = initState.currentUser;
        sessionState.left = initState.left;

        if (to.path !== '/') next('/');
      }
    } else {
      notifyThis({
        message: 'Connexion requise !',
        type: 'warning',
        position: 'bottom',
      });
      if (to.path !== '/') next('/');
    }
    next();
  });
});
