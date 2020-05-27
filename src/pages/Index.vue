<template>
  <q-page class="fullscreen row items-center  justify-center">
    <div style="min-width: 400px">
      <login />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const electron = require('electron');
const Store = require('electron-store');
const store = new Store();

@Component({
  name: 'Index',
  components: {
    login: require('src/components/login.vue').default,
    register: require('src/components/Register.vue').default
  }
})
export default class Index extends Vue {
  private path = store.get('path') || null;
  private app = electron.remote.app;
  private step = 1;
  private checkbox = false;
  private pathAlert = false;
  private messageType = '';

  mounted() {
    //
  }
  checkPath() {
    return store.get('path') || null;
  }
  checkRegister() {
    console.log(store.get('register') || null);
    return store.get('register') || null;
  }
  setMessaType(message: string) {
    this.messageType = message;
  }
}
</script>
