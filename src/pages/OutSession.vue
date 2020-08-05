<template>
  <q-page-container
    v-if="!sessionState"
    class="column fullscreen items-center  justify-center noFilter"
    style="background-color: #2f2d2da3;"
  >
    <SessionLogin style="height: 300px; height: 400px">
      <q-btn
        label="dsfsdf"
        color="amber"
        text-color="black"
        @click="reconnect = true"
      />
    </SessionLogin>
  </q-page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapFields } from 'vuex-map-fields';

@Component({
  name: 'OutSession',
  components: {
    SessionLogin: require('src/components/authentification/SessionLogin.vue')
      .default
  },
  computed: {
    ...mapFields({
      currentUser: 'usersModule.currentUser',
      sessionState: 'usersModule.session'
    })
  }
})
export default class OutSession extends Vue {
  private reconnect = false;
  private currentUser;
  private sessionState;

  mounted() {
    // console.log({ cur: this.currentUser });
  }
}
</script>
