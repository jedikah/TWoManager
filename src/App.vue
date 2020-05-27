<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'App' })
export default class App extends Vue {
  async mounted() {
    //
  }
}
</script>
