<template>
  <div>
    <q-layout
      :class="!sessionState.session && 'sessionFilter'"
      view="hHh Lpr fff"
      class="fullscreen column"
      style="padding-top: 10px; min-width: 1200px; min-height: 37.47px"
    >
      <q-header reveal class="text-white myHeader">
        <q-toolbar
          class="row"
          style="min-height: 37.47px; color: black; padding-right: 50px"
        >
          <div class="col-1">
            <q-btn
              dense
              flat
              round
              icon="menu"
              @click="routeDrawer = !routeDrawer"
            />
          </div>

          <div class="col-1">
            <q-toolbar-title style="font-size: 1em">
              T.Wo.Manager
            </q-toolbar-title>
          </div>

          <div class="col-10">
            <router-view name="header" />
          </div>
        </q-toolbar>
      </q-header>

      <!-- //Route based drawer -->

      <RouteDrawer v-model="routeDrawer" />

      <q-page-container class="col" style="padding-top: 0">
        <div style="min-width: calc(100vw - 55px)">
          <router-view style="min-width: 100%" />
        </div>

        <q-card v-if="countDown <= 15 && countDown > 0" class="myCountDownCard">
          <p></p>
          <p>session expiré dans:</p>
          <p>{{ countDown }}</p>
          <p>second</p>
        </q-card>
      </q-page-container>
    </q-layout>

    <q-layout>
      <OutSession />
    </q-layout>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { computed, defineComponent, ref, watchEffect } from 'vue';

import userSession from 'src/utils/session.module';
import { useSession } from 'src/services/session/useSession';

export const formWidth = ref(400);

export default defineComponent({
  name: 'MaynLayout',
  components: {
    OutSession: require('src/pages/OutSession.vue').default,
    // FolderForm: require('src/components/folder/FolderForm').default,
    // FolderHeader: require('src/components/folder/FolderHeader.vue').default,
    RouteDrawer: require('./MainLayout.routeDrawer.vue').default,
  },
  setup: () => {
    const route = useRoute();
    const countDown = ref(16);
    const routeName = computed(() => route.name);
    const routeDrawer = ref(true);

    const { state: sessionState } = useSession();

    const startSession = (session: boolean) => {
      if (session === true) {
        userSession.start(sessionState.currentUser.exp);
        userSession.onTimeOutChange((t) => {
          if (t <= 15 && t >= 0) {
            countDown.value = t;
          } else countDown.value = 16;
          if (t === 1) setTimeout(() => (sessionState.session = false), 1000);
        });
      }
    };

    watchEffect(() => {
      startSession(sessionState.session);
    });

    return {
      routeName,
      routeDrawer,
      sessionState,
      countDown,
    };
  },
});
</script>

<style scoped>
.fab-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  top: 20px;
  left: 40%;
  border-radius: 50px;
  box-shadow: 0.2px 0.2px 3px gray;
}

.fab-container div {
  border-radius: 50px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .q-drawer {
  background: red !important;
} */
</style>
