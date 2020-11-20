<template>
  <div>
    <FolderAddForm v-if="folderFormBtn === 'add'" />
    <FolderUpdateForm v-if="folderFormBtn === 'update'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useAddClientByUser } from 'src/services/clients/useAddClientByUser';
import { folderFormBtn } from './folderHeader.vue';

export default defineComponent({
  name: 'folderForm',
  components: {
    FolderAddForm: require('./folderForm.add').default,
    FolderUpdateForm: require('./folderForm.update').default
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
