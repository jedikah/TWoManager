<template>
  <div style="width: 100%; height: 100%; border: 1px solid #e0dede">
    <FolderAddForm v-if="folderFormBtn === 'add'" />
    <FolderUpdateForm v-if="folderFormBtn === 'update'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useAddClientByUser } from 'src/services/clients/useAddClientByUser';
import { folderFormBtn } from './FolderHeader.vue';

export default defineComponent({
  name: 'folderForm',
  components: {
    FolderAddForm: require('./FolderForm.add').default,
    FolderUpdateForm: require('./FolderForm.update').default
  },
  setup: () => {
    const [state, submitAddClient] = useAddClientByUser();

    return {
      state,
      submitAddClient,
      folderFormBtn
    };
  }
});
</script>
