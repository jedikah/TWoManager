<template>
  <q-page-container
    v-if="sessionState.session !== undefined && !sessionState.session"
    class="column fullscreen items-center justify-center noFilter"
    style="background-color: #2f2d2da3"
  >
    <SessionLogin style="width: 300px">
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
import { defineComponent, ref } from 'vue';
import { useSession } from 'src/services/session/useSession';

export default defineComponent({
  name: 'OutSession',
  components: {
    SessionLogin: () =>
      import('src/components/authentification/SessionLogin.vue'),
  },
  setup: () => {
    const { state: sessionState } = useSession();

    const reconnect = ref(false);

    return {
      reconnect,
      sessionState,
    };
  },
});
</script>
