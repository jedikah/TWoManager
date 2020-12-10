<template>
  <q-page>
    <div
      class="q-pa-md q-gutter-md border-blue"
      style="min-height: 720px; max-height: 900px; margin: 5px"
    >
      <ListFolder />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Folder',
  components: {
    ListFolder: require('../components/folder/ListFolder').default
  }
});
</script>
