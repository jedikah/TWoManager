<template>
  <q-drawer
    v-model="routeDrawer"
    side="left"
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    behavior="desktop"
    bordered
    show-if-above
    :width="200"
    :breakpoint="500"
    class="drawer"
  >
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <q-item
          @click="state.router.push('/main')"
          :active="state.active.clients"
          :clickable="!state.active.clients"
          :style="!state.active.clients && 'color: white'"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="perm_contact_calendar" />
          </q-item-section>

          <q-item-section> Clients </q-item-section>
        </q-item>

        <q-item
          @click="state.router.push('/main/folders')"
          :style="!state.active.folders && 'color: white'"
          :active="state.active.folders"
          :clickable="!state.active.folders"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="folder_shared" />
          </q-item-section>

          <q-item-section> Dossiers </q-item-section>
        </q-item>

        <q-item
          @click="state.router.push('/main/models')"
          :style="!state.active.models && 'color: white'"
          :active="state.active.models"
          :clickable="!state.active.models"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>

          <q-item-section> Model </q-item-section>
        </q-item>

        <q-item :style="'color: white'" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fact_check" color="white" />
          </q-item-section>

          <q-item-section> Factures </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img
      class="absolute-top"
      src="http://localhost:81/TWoM/background.jpg"
      style="height: 150px"
    >
      <div
        class="absolute-bottom bg-transparent column justify-center items-center"
        :style="miniState && 'padding-left: 0'"
      >
        <q-avatar size="56px" class="q-mb-md">
          <img src="http://localhost:81/TWoM/avatar.jpg" />
        </q-avatar>
        <div
          :style="miniState && 'visibility: hidden'"
          class="text-weight-bold"
        >
          {{ sessionState.currentUser.userName }}
        </div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { defineComponent, computed, ref } from 'vue';
import { useSession } from 'src/services/session/useSession';
import { routeDrawer } from './MainLayout.vue';

export default defineComponent({
  name: 'DrawerRoute',
  setup: () => {
    const miniState = ref(true);
    const router = useRouter();
    const route = useRoute();
    const { state: sessionState } = useSession();

    const state = computed(() => {
      return {
        active: {
          clients: route.name === 'CLIENT' ? true : false,
          folders: route.name === 'FOLDER' ? true : false,
          models: route.name === 'MODEL' ? true : false,
        },
        router,
      };
    });

    return { routeDrawer, state, miniState, sessionState };
  },
});
</script>

<style lang="scss">
.drawer {
  background: $bg-dark;
}
</style>
