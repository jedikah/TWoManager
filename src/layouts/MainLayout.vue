<template>
  <q-layout view="lHh LpR lfr" class=" fullscreen">
    <div :class="!sessionState && 'sessionFilter'" style="padding-top: 10px">
      <q-header
        reveal
        class="text-white"
        style="background: white; position: absolute; top: 10px; border-radius: 45px 45px 45px 45px; box-shadow: 1px 1px 5px grey"
      >
        <q-toolbar class=" full-height" style="min-height: 35px; color: black;">
          <q-btn dense flat round icon="menu" @click="left = !left" />

          <q-toolbar-title style="font-size: 1em">
            T.Wo.Manager
          </q-toolbar-title>

          <q-btn dense flat round icon="menu" @click="right = !right" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="left" side="left" behavior="desktop" bordered>
        <!-- drawer content -->
      </q-drawer>

      <q-drawer v-model="right" side="right" behavior="desktop" bordered>
        <q-scroll-area
          style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
        >
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section @click="$router.push('/')">
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

      <q-page-container>
        <router-view />

        <q-card
          v-if="countDownState <= 15 && countDownState > 0"
          style="height: 90px;
        width: 150px;
        background: none;
        color: grey;
        opacity: 0.5;
        line-height: 10px;
        text-align: center;
        position: fixed;
        bottom: 50px;
        zoom: 0.8"
        >
          <p></p>
          <p>session expiré dans:</p>
          <p>{{ countDownState }}</p>
          <p>second</p>
        </q-card>
      </q-page-container>
    </div>
    <OutSession />
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapFields } from 'vuex-map-fields';

import userSession from 'src/module/session.module';

@Component({
  name: 'MainLayout',
  computed: {
    ...mapFields({
      sessionState: 'usersModule.session',
      countDownState: 'usersModule.countDown',
      currentUserState: 'usersModule.currentUser'
    })
  },
  components: {
    OutSession: require('src/pages/OutSession.vue').default
  }
})
export default class MainLayout extends Vue {
  private countDownState: number;
  private sessionState;
  private left = false;
  private right = false;
  private currentUserState: {
    userId?: number;
    userName: string;
    login: string;
    photo?: string;
    type: string;
    status: boolean;
    iat?: number;
    exp?: number;
  };

  @Watch('sessionState')
  changeSession(session) {
    this.startSession(session);
  }

  startSession(sessionState) {
    if (sessionState === true) {
      userSession.start(this, this.currentUserState.exp);
      userSession.onTimeOutChange(t => {
        console.log(t);
        if (t <= 15) {
          this.countDownState = t;
        } else this.countDownState = 16;
        if (t === 0) this.sessionState = false;
      });
    }
  }

  mounted() {
    this.startSession(this.sessionState);
  }
}
</script>
