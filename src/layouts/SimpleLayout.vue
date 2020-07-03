<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { User } from 'src/models/types';
import { Session } from 'src/store/user/types';
import userSession from 'src/module/session.module';

const user = namespace('user');

@Component({
  name: 'SimpleLayout'
})
export default class SimpleLayout extends Vue {
  mounted() {
    const check = userSession.start(tokenIsExpired => {});
    if (check) this.$router.push('/main');
    else if (this.$router.currentRoute.path !== '/') this.$router.push('/');
  }
}
</script>
