<template>
  <q-btn
    dense
    round
    color="white"
    text-color="primary"
    icon="add"
    @click="open = true"
  />
  <folder-form
    form-card-style=" width: 400px"
    title="Ajouter un dossier"
    v-model:open="open"
    v-model:register="addFoldersArgs.input.register"
    v-model:numTitle="addFoldersArgs.input.numTitle"
    v-model:groundName="addFoldersArgs.input.groundName"
    v-model:localisationTrav="addFoldersArgs.input.localisationTrav"
    v-model:fokontany="addFoldersArgs.input.fokontany"
    v-model:dateTrav="addFoldersArgs.input.dateTrav"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { date } from 'quasar';

import { useAddFolder } from '../../services/folders/useAddFolder';

export default defineComponent({
  name: 'AddFolder',
  components: {
    FolderForm: require('./FolderForm.vue').default,
  },
  setup: () => {
    const open = ref(false);

    const { addFoldersArgs, submit } = useAddFolder();

    const selectedClient: Ref<{ label: string; value: string }> = ref();
    const selectedTypeTravs: Ref<{ label: string; value: string }> = ref();

    function handleSelectedClient(clientId: string) {
      addFoldersArgs.input.clientId = parseInt(clientId);
    }

    function handleSelectedTypeTravs(typeTravId: string) {
      addFoldersArgs.input.typeTravId = parseInt(typeTravId);
    }

    return {
      addFoldersArgs,
      selectedClient,
      selectedTypeTravs,
      handleSelectedClient,
      handleSelectedTypeTravs,
      submit,
      date,
      open,
    };
  },
});
</script>

<style></style>
