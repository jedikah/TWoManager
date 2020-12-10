<template>
  <div>
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
      content-class="bg-grey-3"
    >
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item
            @click="state.router.push('/main')"
            :active="state.active.clients"
            :clickable="!state.active.clients"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="perm_contact_calendar" />
            </q-item-section>

            <q-item-section>
              Clients
            </q-item-section>
          </q-item>

          <q-item
            @click="state.router.push('/main/folders')"
            :active="state.active.folders"
            :clickable="!state.active.folders"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="folder_shared" />
            </q-item-section>

            <q-item-section>
              Dossiers
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="fact_check" />
            </q-item-section>

            <q-item-section>
              Factures
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
  </div>
</template>

<script lang="ts">
import { useRouter } from '@u3u/vue-hooks';
import { defineComponent, computed, ref } from '@vue/composition-api';
import { routeDrawer } from './MainLayout.vue';

export default defineComponent({
  name: 'DrawerRoute',
  setup: () => {
    const miniState = ref(true);
    const { router, route } = useRouter();

    const state = computed(() => {
      return {
        active: {
          clients: route.value.name === 'CLIENT' ? true : false,
          folders: route.value.name === 'FOLDER' ? true : false
        },
        router
      };
    });

    return { routeDrawer, state, miniState };
  }
});
</script>
