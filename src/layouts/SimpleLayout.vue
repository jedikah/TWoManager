<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

@Component({
  name: 'SimpleLayout',
  computed: {
    ...mapFields({
      sessionState: 'usersModule.session'
    })
  }
})
export default class SimpleLayout extends Vue {
  private sessionState;
}
</script>
