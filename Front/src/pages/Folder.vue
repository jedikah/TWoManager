<template>
  <q-page>
    <ListFolder />
    <AddFolder />
  </q-page>
</template>

<script lang="ts">
import ListFolder from '../components/folder/ListFolder.vue';
import AddFolder from '../components/folder/AddFolder.vue';

export default {
  name: 'Folder',
  components: {
    ListFolder,
    AddFolder
  }
};
</script>
