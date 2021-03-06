<template>
  <div style="position: relative; padding-left: 10px">
    <FolderAddForm v-if="folderFormBtn === 'addFolder'" />
    <FolderUpdateForm v-if="folderFormBtn === 'updateFolder'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useAddClients } from 'src/services/clients/useAddClients';

type FolderFormBtn = null | 'addFolder' | 'updateFolder';

export const folderFormBtn: Ref<FolderFormBtn> = ref();

export default defineComponent({
  name: 'folderForm',
  components: {
    FolderAddForm: require('./FolderForm.add.vue').default,
    FolderUpdateForm: require('./FolderForm.update.vue').default,
  },
  setup: () => {
    return {
      folderFormBtn,
    };
  },
});
</script>
