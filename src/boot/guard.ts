import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';
import usersQueries from 'src/client/queries/users.query';

export default boot(({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    try {
      const token = localStorage.getItem('token');
      let userData = null;
      if (token) {
        console.log('1');
        userData = await usersQueries.checkToken(token);

        console.log({ userData });

        if (userData && to.path === '/') {
          store.commit('usersModule/currentUser', userData);
          store.commit('usersModule/session', false);
          next('/main');
        }
        if (!userData && to.path !== '/') {
          store.commit('usersModule/currentUser', userData);
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
        userData = await usersQueries.checkToken(token);
        const newUserData = {
          ...userData,
          photo: 'http://localhost:80/TWoM/' + userData.photo
        };

        store.commit('usersModule/currentUser', newUserData);
      }
    } catch (err) {
      console.log('boot guard error: ' + err);
    }
  });
});
