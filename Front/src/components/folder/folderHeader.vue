<template>
  <div>
    <q-btn-group push flat dense>
      <q-btn push label="Ajouter folder" @click="handleChange('add')" />
      <q-btn push label="update folder" @click="handleChange('update')" />
    </q-btn-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { formsDrawer } from 'src/layouts/MainLayout.vue';

export const folderFormBtn = ref('add');

export default defineComponent({
  name: 'clientHeader',
  components: {},
  setup: () => {
    const handleChange = (btn: string) => {
      formsDrawer.value = true;
      folderFormBtn.value = btn;
    };

    return { formsDrawer, handleChange };
  }
});
</script>
