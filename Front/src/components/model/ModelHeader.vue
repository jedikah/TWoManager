<template>
  <div class="row justify-center items-center" style="width: 100%">
    <div class="col-10">
      <div class="text-center">Modele</div>
    </div>

    <div class="col-1">
      <q-btn icon="save" color="secondary" @click="handleSave" />
    </div>

    <div class="col-1">
      <q-btn color="secondary" @click="handleFinished">Terminer</q-btn>
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >Voulez-vous Enregistrer les modification ?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Oui"
            color="primary"
            @click="() => handleConfirm(true)"
            v-close-popup
          />
          <q-btn
            flat
            label="Non"
            color="primary"
            @click="() => handleConfirm(false)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { editorViewerState, useModel } from 'src/services/model/useModels';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ModelHeader',
  components: {},
  setup: () => {
    const {} = useModel();

    const confirm = ref(false);

    function handleSave() {
      //
    }

    function handleFinished() {
      confirm.value = true; //s'il y aeu modification
    }

    function handleConfirm(accept: boolean) {
      switch (accept) {
        case true:
          break;
        case false:
          break;
      }

      editorViewerState.panelMode = 'list';
    }

    return {
      editorViewerState,
      handleConfirm,
      confirm,
      handleFinished,
      handleSave,
    };
  },
});
</script>
