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
import { defineComponent, ref } from '@vue/composition-api';
import { useState } from '@u3u/vue-hooks';
import { Component, Vue } from 'vue-property-decorator';
import { mapFields } from 'vuex-map-fields';

export default defineComponent({
  components: {
    SessionLogin: require('src/components/authentification/SessionLogin.vue')
      .default
  },
  setup: () => {
    const state = {
      ...useState('sessionModule', {
        session: 'session'
      })
    };
    const reconnect = ref(false);

    console.log(state.session.value);

    const test = ref(false);

    return {
      reconnect,
      ...state,
      test
    };
  }
});
</script>
