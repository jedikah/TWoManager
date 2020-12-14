<template>
  <q-page>
    <div class="q-pa-md q-gutter-md" style=" margin: 2px; height: 100%">
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
