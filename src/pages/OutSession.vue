<template>
  <q-page
    v-if="session === 'disconnected'"
    class="column fullscreen items-center  justify-center"
    style="background-color: #2f2d2da3"
  >
    <Login style="height: 300px; height: 300px" />
    <q-card
      v-if="countDown <= 15"
      style="height: 90px; width: 150px; background: none; color: white; opacity: 0.5; line-height: 10px;text-align: center; position: fixed; bottom: 50px"
    >
      <p></p>
      <p>session expiré dans:</p>
      <p>{{ countDown }}</p>
      <p>second</p>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'OutSession',
  components: {
    Login: require('src/components/Login.vue').default
  }
})
export default class OutSession extends Vue {
  @Prop() readonly countDown: number;
  @Prop() readonly session: string;
}
</script>
