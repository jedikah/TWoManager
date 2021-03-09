<template>
  <div class="row justify-center items-center" style="width: 100%">
    <div class="col-11">
      <div class="text-center">Modele</div>
    </div>
    <div class="col-1">
      <q-btn color="secondary" @click="handleFinished">Terminer</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { editorViewerState } from 'src/services/model/useModels';
// import { formsDrawer } from '../../layouts/MainLayout.vue';

export default defineComponent({
  name: 'FolderHeader',
  components: {},
  setup: () => {
    function handleFinished() {
      editorViewerState.panelMode = 'list';
    }
    return { handleFinished };
  },
});
</script>
