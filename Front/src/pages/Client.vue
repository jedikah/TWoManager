<template>
  <q-page class="">
    <q-card>
      <q-card-section class=" no-padding">
        <ClientTable />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    ClientTable: require('src/components/client/ClientTable.vue').default
  },
  setup: () => {
    return {};
  }
});
</script>
