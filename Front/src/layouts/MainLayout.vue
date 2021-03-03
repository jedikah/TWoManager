<template>
  <div>
    <q-layout
      :class="!sessionState.session && 'sessionFilter'"
      view="hHh LpR fff"
      class="fullscreen column"
      style="padding-top: 10px; min-width: 1280px"
    >
      <q-header reveal class="text-white myHeader">
        <q-toolbar
          class="full-height row"
          style="min-height: 35px; color: black; padding-right: 50px"
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

      <RouteDrawer />

      <!-- // FORM DRAWER  -->
      <q-drawer
        :mini-width="400"
        :width="400"
        v-model="formsDrawer"
        side="right"
        behavior="desktop"
        style="padding-right: 20px; margin-top: 20px"
        overlay
        mini-to-overlay
      >
        <div
          class="q-mini-drawer-hide absolute-top fab-container"
          style="margin-top: 20px"
        >
          <div class="full-width full-height bg-white">
            <q-fab
              v-model="formsDrawer"
              @click="handleCloseRouteDrawer"
              color="amber"
              text-color="black"
              icon="keyboard_arrow_left"
              direction="right"
              style="z-index: 1000"
            />
          </div>
        </div>

        <div style="margin-top: 55px">
          <router-view name="form" />
        </div>
      </q-drawer>

      <q-page-container class="col" style="padding-top: 0">
        <div class="row" style="width: 100%">
          <router-view style="width: 100%" />
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
import { clientFormBtn } from 'src/components/client/ClientForm.vue';
import { folderFormBtn } from 'src/components/folder/FolderForm.vue';

import userSession from 'src/utils/session.module';
import { useSession } from 'src/services/session/useSession';

export const formsDrawer = ref(false);
export const routeDrawer = ref(true);
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

    const handleCloseRouteDrawer = () => {
      clientFormBtn.value = null;
      folderFormBtn.value = null;
    };

    watchEffect(() => {
      startSession(sessionState.session);
    });

    return {
      routeName,
      formsDrawer,
      routeDrawer,
      sessionState,
      countDown,
      handleCloseRouteDrawer,
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
