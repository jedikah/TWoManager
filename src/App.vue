/* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable
@typescript-eslint/no-unused-vars */
<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import isE from 'is-electron';
const isElectron = isE();
let remote;
isElectron ? ({ remote } = require('electron')) : {};

@Component({ name: 'App' })
export default class App extends Vue {
  mounted() {
    // console.log('user ***', await Query.login('jedikah', '123'));
    // console.log({ app: await Query.users() });
    console.log({ 'is electron': isElectron });
    if (isElectron) console.log(remote);
  }
}
</script>
