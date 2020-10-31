<template>
  <div>
    <q-layout
      :class="!sessionState.session && 'sessionFilter'"
      view="hHh LpR lfr"
      class=" fullscreen column"
      style="padding-top: 10px"
    >
      <q-header reveal class="text-white myHeader ">
        <q-toolbar class=" full-height" style="min-height: 35px; color: black;">
          <q-btn dense flat round icon="menu" @click="left = !left" />

          <q-toolbar-title style="font-size: 1em">
            T.Wo.Manager
          </q-toolbar-title>

          <q-btn
            dense
            flat
            round
            icon="menu"
            @click="formsDrawer = !formsDrawer"
          />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="left" side="left" behavior="desktop" bordered>
        <q-scroll-area
          style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
        >
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section @click="router.push('/')">
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer>

      <!-- // FORM DRAWER MENU -->
      <q-drawer
        :width="400"
        v-model="formsDrawer"
        side="right"
        behavior="desktop"
      >
        <div class=" full-height full-width column " style="padding: 20px">
          <ClienForm v-if="route.name === 'CLIENT'" />
        </div>
      </q-drawer>

      <q-page-container class="col">
        <router-view class=" full-width" />

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
import { defineComponent, ref, watchEffect } from '@vue/composition-api';

import userSession from 'src/module/session.module';
import { useSession } from 'src/services/session/useSession';

export default defineComponent({
  name: 'MaynLayout',
  components: {
    OutSession: require('src/pages/OutSession.vue').default,
    ClienForm: require('src/components/client/ClientForm').default
  },
  setup: (_, { root }) => {
    const countDown = ref(16);
    const left = ref(true);
    const formsDrawer = ref(true);

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

    watchEffect(() => {
      startSession(sessionState.session);
    });

    return {
      route: root.$route,
      formsDrawer,
      left,
      sessionState,
      countDown
    };
  }
});
</script>
