import Vue from 'vue';
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import { Accessors } from 'types';

import { LoginForm } from 'src/store/users/login/login.types';

export const LoginProperty = Vue.extend({
  template: '#anchored-heading-template',
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
