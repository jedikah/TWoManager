import { Vue } from 'vue-property-decorator';
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import { Accessors } from 'types';

import { RegisterForm } from 'src/store/users/register/register.types';
import { LoginForm } from 'src/store/users/login/login.types';
import { CurrentUser } from 'src/store/users/users.types';

export const LoginProperty = Vue.extend({
  computed: {
    ...(mapFields({
      login: 'usersModule.loginState.form.login',
      password: 'usersModule.loginState.form.password'
    }) as Accessors<LoginForm>)
  },
  methods: {
    ...mapActions('usersModule', { loginSubmit: 'loginSubmit' })
  }
});

export const RegisterProperty = Vue.extend({
  computed: {
    ...(mapFields({
      login: 'usersModule.registerState.form.login',
      userName: 'usersModule.registerState.form.userName',
      password: 'usersModule.registerState.form.password',
      pdpFile: 'usersModule.registerState.form.pdpSrc'
    }) as Accessors<RegisterForm>)
  },
  methods: {
    ...mapActions('usersModule', { register: 'register' })
  }
});

export const SessionLoginProperty = Vue.extend({
  computed: {
    ...(mapFields({
      password: 'usersModule.loginState.form.password',
      currentUser: 'usersModule.currentUser'
    }) as Accessors<{ password: string; currentUser: CurrentUser }>)
  },
  methods: {
    ...mapActions('usersModule', {
      loginSessionSubmit: 'loginSessionSubmit',
      checkTokenSession: 'checkTokenSession'
    })
  }
});
