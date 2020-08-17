import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';

import { checkToken } from 'src/services/users/checkToken';

export default boot(({ router, store, redirect }) => {
  const commitStates = async token => {
    const userData = await checkToken(token);
    const newUserData = {
      ...userData,
      photo: userData.photo ? 'http://localhost:80/TWoM/' + userData.photo : ''
    };

    store.commit('sessionModule/setCurrentUser', newUserData);
    store.commit('sessionModule/setSession', true);

    return userData;
  };
  router.beforeEach(async (to, from, next) => {
    try {
      const token = localStorage.getItem('token');
      let userData = null;
      if (token) {
        userData = await commitStates(token);

        if (userData && to.path === '/') {
          next('/main');
        }
        if (!userData && to.path !== '/') {
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
    try {
      if (token && to.path !== '/') await commitStates(token);
    } catch (err) {
      console.log('boot guard error: ' + err);
    }
  });
});
