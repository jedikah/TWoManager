<template>
  <q-page>
    <ListFolder />
  </q-page>
</template>

<script lang="ts">
import ListFolder from '../components/folder/ListFolder.vue';

export default {
  name: 'Folder',
  components: {
    ListFolder
  }
};
</script>
