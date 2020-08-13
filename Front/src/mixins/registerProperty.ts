import { Vue } from 'vue-property-decorator';
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import { Accessors } from 'types';

import { RegisterForm } from 'src/store/users/register/register.types';

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
