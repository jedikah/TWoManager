import { Vue } from 'vue-property-decorator';
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import { Accessors } from 'types';

import { CurrentUser } from 'src/store/users/users.types';

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
