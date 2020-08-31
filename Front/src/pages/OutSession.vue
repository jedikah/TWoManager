<template>
  <q-page-container
    v-if="!session"
    class="column fullscreen items-center  justify-center noFilter"
    style="background-color: #2f2d2da3;"
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
import { defineComponent, ref, computed } from '@vue/composition-api';

export default defineComponent({
  name: 'OutSession',
  components: {
    SessionLogin: require('src/components/authentification/SessionLogin.vue')
      .default
  },
  setup: (_, { root }) => {
    const session = computed(() => root.$store.state.sessionModule.session);

    const reconnect = ref(false);

    console.log({ outsession: session });

    return {
      reconnect,
      session,
      test: root.$store.state.sessionModule.session
    };
  }
});
</script>
