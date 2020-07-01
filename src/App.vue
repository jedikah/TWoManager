<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Query from './models/query/user';

@Component({ name: 'App' })
export default class App extends Vue {
  async mounted() {
    // console.log('user ***', await Query.login('jedikah', '123'));
    // console.log({ app: await Query.users() });
  }
}
</script>
