<template>
  <q-layout view="hHh LpR lfr">
    <q-header reveal elevated class="text-white" style="background: #505050">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          T.Wo.Manager
        </q-toolbar-title>

        <q-btn dense flat round @click="right = !right">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
        </q-btn>
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
      <OutSession :countDown="time" :session="sessionStatus" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

// import { User } from 'src/models/types';
import userSession from 'src/module/session.module';
// import { disconnect } from 'cluster';

const user = namespace('user');

@Component({
  name: 'MainLayout',
  components: {
    OutSession: require('src/pages/OutSession.vue').default
  }
})
export default class MainLayout extends Vue {
  private left = false;
  private right = false;
  private time = -1;
  constructor(private times) {
    super();
  }

  @user.State
  public sessionStatus: string;

  @user.Action
  public setSession: (session: string) => void;

  @Watch('sessionStatus')
  changeSessionStatus() {
    this.handleChangeSession();
  }

  handleChangeSession() {
    userSession.onTimeOutChange(time => {
      this.time = time;
      if (time === 15) this.setSession('disconnected');
    });
  }

  mounted() {
    this.handleChangeSession();
  }
}
</script>
