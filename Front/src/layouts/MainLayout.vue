<template>
  <div>
    <q-layout
      :class="!sessionState.session && 'sessionFilter'"
      view="hHh LpR lfr"
      class=" fullscreen column"
      style="padding-top: 10px; min-width: 1280px"
    >
      <q-header reveal class="text-white myHeader ">
        <q-toolbar
          class=" full-height"
          style="min-height: 35px; color: black; padding-right: 50px"
        >
          <q-btn
            dense
            flat
            round
            icon="menu"
            @click="routeDrawer = !routeDrawer"
          />

          <q-toolbar-title style="font-size: 1em">
            T.Wo.Manager
          </q-toolbar-title>
          <ClientHeader v-if="routeName === 'CLIENT'" />
          <FolderHeader v-if="routeName === 'FOLDER'" />
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
      >
        <div
          class=" full-height full-width column items-center"
          style="padding: 2px;"
        >
          <ClientForm v-if="routeName === 'CLIENT'" />
          <FolderForm v-if="routeName === 'FOLDER'" />
        </div>

        <div
          class="q-mini-drawer-hide absolute"
          style="top: 36.5vh; left: -30px"
        >
          <q-fab
            v-model="formsDrawer"
            @click="handleCloseRouteDrawer"
            color="amber"
            text-color="black"
            icon="keyboard_arrow_left"
            direction="right"
            style="z-index: 1000"
          >
          </q-fab>
        </div>
      </q-drawer>

      <q-page-container class="col">
        <div class="row full-width">
          <router-view style="width: 94%" />
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
import { useRouter } from '@u3u/vue-hooks';
import {
  computed,
  defineComponent,
  ref,
  watchEffect
} from '@vue/composition-api';
import { clientFormBtn } from 'src/components/client/clientHeader.vue';
import { folderFormBtn } from 'src/components/folder/folderHeader.vue';

import userSession from 'src/module/session.module';
import { useSession } from 'src/services/session/useSession';

export const formsDrawer = ref(false);
export const routeDrawer = ref(true);
export const formWidth = ref(400);

export default defineComponent({
  name: 'MaynLayout',
  components: {
    OutSession: require('src/pages/OutSession.vue').default,
    ClientForm: require('src/components/client/ClientForm').default,
    ClientHeader: require('src/components/client/clientHeader').default,
    FolderForm: require('src/components/folder/folderForm').default,
    FolderHeader: require('src/components/folder/folderHeader').default,
    RouteDrawer: require('./MainLayout.routeDrawer.vue').default
  },
  setup: () => {
    const { route } = useRouter();
    const countDown = ref(16);
    const routeName = computed(() => route.value.name);

    const { state: sessionState } = useSession();

    const startSession = (session: boolean) => {
      if (session === true) {
        userSession.start(sessionState.currentUser.exp);
        userSession.onTimeOutChange(t => {
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
      handleCloseRouteDrawer
    };
  }
});
</script>
