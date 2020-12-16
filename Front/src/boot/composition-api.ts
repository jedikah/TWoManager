import VueCompositionApi, { inject, provide } from '@vue/composition-api';
import { boot } from 'quasar/wrappers';
import { DefaultApolloClient } from '@vue/apollo-composable';
import hooks, { useRouter } from '@u3u/vue-hooks';
import { apolloClient } from 'src/services/applloClient';
import VueHtmlToPaper from 'vue-html-to-paper';

import { useSession } from 'src/services/session/useSession';
import { notifyThere } from 'src/services/context';

export default boot(({ Vue, app }) => {
  Vue.use(VueCompositionApi);
  Vue.use(hooks);

  const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
    styles: [
      'modelView.min.css'
      // 'https://cdn.jsdelivr.net/npm/quasar@1.14.7/dist/quasar.min.css'
    ]
  };
  Vue.use(VueHtmlToPaper, options);

  app.setup = () => {
    provide(DefaultApolloClient, apolloClient);

    const { router, route } = useRouter();

    const {
      checkToken,
      state: sessionState,
      onDone: onCheckTonkenDone
    } = useSession();
    // On boot
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token);
      onCheckTonkenDone(({ data: checkTokenData, errors }) => {
        if (errors) notifyThere(errors);
        if (checkTokenData.checkToken && route.value.path === '/') {
          router.push('/main').catch(err => console.log(err));
        }
      });
    } else {
      router.replace('/');
    }

    // On before guard
    router.beforeEach((to, from, next) => {
      const token = localStorage.getItem('token');
      console.log('before');
      if (token) {
        checkToken(token);

        onCheckTonkenDone(({ data: checkTokenData, errors }) => {
          if (errors) notifyThere(errors);
          if (checkTokenData.checkToken) {
            if (sessionState.currentUser.userId && to.path === '/') {
              console.log('before 1');
              next('/main');
            }
            if (!sessionState.currentUser.userId && to.path !== '/') {
              console.log('before 2');
              next('/');
            }

            next();
          }
        });
      } else {
        // root.$q.notify({
        //   type: 'warning',
        //   message: 'Page protégée, connexion requise !',
        //   position: 'bottom',
        //   timeout: 6000,
        //   progress: true
        // });

        next(false);
      }
    });

    return {};
  };
});
