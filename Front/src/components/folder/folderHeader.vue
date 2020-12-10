<template>
  <div>
    <q-btn-toggle
      dense
      v-model="folderFormBtn"
      @click="formsDrawer = true"
      color="orange"
      text-color="white"
      toggle-color="amber"
      toggle-text-color="black"
      unelevated
      glossy
      :options="[
        { label: 'Ajouter un dossier', value: 'add' },
        { label: 'Modifier un dossier', value: 'update' }
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { formsDrawer } from '../../layouts/MainLayout.vue';

export const folderFormBtn = ref();

export default defineComponent({
  name: 'clientHeader',
  components: {},
  setup: () => {
    return { formsDrawer, folderFormBtn };
  }
});
</script>
