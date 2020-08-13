import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';

import { checkToken } from 'src/services/users/checkToken';

export default boot(({ router, store, redirect }) => {
  router.beforeEach(async (to, from, next) => {
    try {
      const token = localStorage.getItem('token');
      let userData = null;
      if (token) {
        console.log('1');
        userData = await checkToken(token);

        console.log({ userData });

        if (userData && to.path === '/') {
          next('/main');
        }
        if (!userData && to.path !== '/') {
          store.commit('usersModule/setCurrentUser', userData);
          store.commit('usersModule/session', false);
          next('/');
        }
      }
      if (!token && to.path !== '/') {
        if (from.path === '/') {
          Notify.create({
            type: 'warning',
            message: 'Page protégée, connexion requise !',
            position: 'bottom',
            timeout: 6000,
            progress: true
          });
        }
        next('/');
      }

      next();
    } catch (err) {
      console.log(err);
    }
  });

  router.afterEach(async (to, from) => {
    const token = localStorage.getItem('token');
    let userData = null;
    try {
      if (token && to.path !== '/') {
        userData = await checkToken(token);
        const newUserData = {
          ...userData,
          photo: userData.photo
            ? 'http://localhost:80/TWoM/' + userData.photo
            : ''
        };

        store.commit('usersModule/setCurrentUser', newUserData);
        store.commit('usersModule/setSession', true);
      }
    } catch (err) {
      console.log('boot guard error: ' + err);
    }
  });
});
