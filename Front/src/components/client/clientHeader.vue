<template>
  <div>
    <q-btn-toggle
      dense
      v-model="clientFormBtn"
      @click="formsDrawer = true"
      color="orange"
      text-color="white"
      toggle-color="amber"
      toggle-text-color="black"
      unelevated
      glossy
      :options="[
        { label: 'Ajouter un client', value: 'add' },
        { label: 'Modifier un client', value: 'update' }
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { formsDrawer } from '../../layouts/MainLayout.vue';

export const clientFormBtn = ref();

export default defineComponent({
  name: 'ClientHeader',
  components: {},
  setup: () => {
    return { formsDrawer, clientFormBtn };
  }
});
</script>
