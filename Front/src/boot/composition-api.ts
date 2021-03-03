import { boot } from 'quasar/wrappers';
import { DefaultApolloClient} from '@vue/apollo-composable';
import { apolloClient } from 'src/services/applloClient';

import { state as sessionState, initState } from 'src/services/session/useSession';
import { notifyThis } from 'src/services/context';
import { checkToken } from './../services/users/checkToken';
import  VueHtmlToPaper from '../utils/VueHtmlToPaper';

export default boot(({ app, router }) => {

  const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
    styles: [
      './modelView.min.css',
      // 'https://cdn.jsdelivr.net/npm/quasar@1.14.7/dist/quasar.min.css'
    ]
  };

    app.use(VueHtmlToPaper, options);
    app.provide(DefaultApolloClient, apolloClient)

      // // BEFORE EACH
      router.beforeEach(async (to, from, next) => {
        const token = localStorage.getItem('token');
        const data = await checkToken(token)
        if (token) {
          if(data){
            sessionState.session = true;
            sessionState.currentUser = data;

            if(to.path === '/') next('/main');
          }
          else {
            sessionState.session = initState.session;
            sessionState.currentUser = initState.currentUser;
            sessionState.left = initState.left;

            if(to.path !== '/') next('/');
          }
        } else {
          notifyThis({
            message: 'Page protégée, connexion requise !',
            type: 'warning',
            position: 'bottom'
          });
          if(to.path !== '/') next('/');
        }
        next();
      });
});
