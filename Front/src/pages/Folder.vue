<template>
  <q-page>
    <ListFolder />
  </q-page>
</template>

<script lang="ts">
import ListFolder from '../components/folder/ListFolder.vue';
import AddFolder from '../components/folder/folderForm.add';

export default {
  name: 'Folder',
  components: {
    ListFolder,
    AddFolder
  }
};
</script>
