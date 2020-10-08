import VueCompositionApi from '@vue/composition-api';
import { boot } from 'quasar/wrappers';
import { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';
import hooks from '@u3u/vue-hooks';
import { apolloClient } from 'src/services/applloClient';

import { checkToken } from 'src/services/users/checkToken';
import { useSession } from 'src/services/session/useSession';
import { Router } from 'src/router';
import { notifyThere } from 'src/services/context';

export default boot(({ Vue, app, store }) => {
  const commitStates = async (token: string, session = true) => {
    const userData = await checkToken(token);
    const newUserData = {
      ...userData,
      photo:
        userData && userData.photo
          ? 'http://localhost:80/TWoM/' + userData.photo
          : ''
    };

    store.commit('sessionModule/setCurrentUser', newUserData);
    store.commit('sessionModule/setSession', session);

    return userData;
  };

  Vue.use(hooks);
  Vue.use(VueCompositionApi);

  app.setup = (_, { root }) => {
    provide(DefaultApolloClient, apolloClient);

    const {
      checkToken,
      state: sessionState,
      onDone: onChectTonkenDone
    } = useSession();

    root.$router.beforeEach((to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) {
        checkToken(token);

        onChectTonkenDone(({ data: checkTokenData, errors }) => {
          if (errors) notifyThere(errors);
          if (checkTokenData.checkToken) {
            if (sessionState.currentUser.userId && to.path === '/') {
              next('/main');
            }
            if (!sessionState.currentUser.userId && to.path !== '/') {
              next('/');
            }

            next();
          }
        });
      }
      if (!token && to.path !== '/') {
        if (from.path === '/') {
          root.$q.notify({
            type: 'warning',
            message: 'Page protégée, connexion requise !',
            position: 'bottom',
            timeout: 6000,
            progress: true
          });
        }
        next('/');

        next();
      }
    });

    root.$router.afterEach(to => {
      const token = localStorage.getItem('token');
      console.log('next after');

      if (token) {
        checkToken(token);

        onChectTonkenDone(({ data: checkTokenData, errors }) => {
          if (errors) notifyThere(errors);
          if (checkTokenData.checkToken) {
            if (to.path === '/') {
              Router.replace('/main');
            }
          }
        });
      }

      if (!token && to.path !== '/') {
        Router.replace('/');
      }
    });
    return {};
  };
});
