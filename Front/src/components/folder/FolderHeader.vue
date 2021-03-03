<template>
  <div style="display: flex; flex-direction: row-reverse">
    <q-btn
      dense
      color="amber"
      @click="$htmlToPaper('test')"
      icon="print"
      label="Imprimer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { formsDrawer } from '../../layouts/MainLayout.vue';

export default defineComponent({
  name: 'FolderHeader',
  // inject: ['$htmlToPaper'],
  components: {},
  setup: () => {
    return { formsDrawer };
  },
});
</script>
