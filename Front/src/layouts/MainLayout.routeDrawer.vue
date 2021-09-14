<template>
  <q-drawer
    v-model="model"
    side="left"
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    behavior="desktop"
    bordered
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
          dark
          @click="$router.push('/main')"
          :active="$route.path === '/main'"
          :clickable="$route.path !== '/main'"
          v-ripple
          active-class="text-primary"
        >
          <q-item-section avatar>
            <q-icon name="perm_contact_calendar" />
          </q-item-section>

          <q-item-section> Clients </q-item-section>
        </q-item>

        <q-item
          dark
          @click="$router.push('/main/folders')"
          :active="$route.path === '/main/folders'"
          :clickable="$route.path !== '/main/folders'"
          v-ripple
          active-class="text-primary"
        >
          <q-item-section avatar>
            <q-icon name="folder_shared" />
          </q-item-section>

          <q-item-section> Dossiers </q-item-section>
        </q-item>

        <q-item
          dark
          @click="$router.push('/main/models')"
          :active="$route.path === '/main/models'"
          :clickable="$route.path !== '/main/models'"
          v-ripple
          active-class="text-primary"
        >
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>

          <q-item-section> Model </q-item-section>
        </q-item>

        <q-item dark clickable v-ripple active-class="text-primary">
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
        class="
          absolute-bottom
          bg-transparent
          column
          justify-center
          items-center
        "
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
import { defineComponent, computed, ref, SetupContext } from 'vue';
import { useSession } from 'src/services/session/useSession';

export default defineComponent({
  name: 'DrawerRoute',
  props: {
    modelValue: Boolean,
  },
  setup: (props, { emit }: SetupContext) => {
    const miniState = ref(true);
    const { state: sessionState } = useSession();

    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    });

    return { model, miniState, sessionState };
  },
});
</script>

<style lang="scss">
.drawer {
  background: $bg-dark;
}
</style>
