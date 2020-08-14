<template>
  <q-page class="row items-center justify-center">
    <div class=" " style="width: 300px; height: 500px">{{}}</div>
  </q-page>
</template>

<script lang="ts">
import {
  ref,
  computed,
  watch,
  toRef,
  reactive,
  defineComponent
} from '@vue/composition-api';

import { mapFields } from 'vuex-map-fields';
import { Accessors } from 'types';

import { LoginForm } from 'src/store/users/login/login.types';

export default defineComponent({
  computed: {
    ...(mapFields({
      login: 'usersModule.loginState.form.login',
      password: 'usersModule.loginState.form.password'
    }) as Accessors<LoginForm>)
  },
  setup: () => {
    const blabla = 'string';

    const g = computed(() => ({}));

    return { blabla };
  },
  methods: {
    test12: () => this.blabla
  }
});
</script>
