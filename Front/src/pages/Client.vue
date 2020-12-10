<template>
  <q-page class="">
    <div class="q-pa-md" style="min-height: 720px; max-height: 900px">
      <ClientTable />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'client',
  components: {
    ClientTable: require('src/components/client/ClientTable.vue').default
  },
  setup: () => {
    return {};
  }
});
</script>
