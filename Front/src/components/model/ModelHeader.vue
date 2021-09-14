<template>
  <div class="row justify-center items-center" style="width: 100%">
    <div class="col-10">
      <div class="text-center">Modele</div>
    </div>

    <div v-if="modelState.panelName === 'editor'" class="col-2 row">
      <q-btn
        dense
        :icon="modelState.readOnly ? 'layers_clear' : 'layers'"
        round
        color="primary"
        @click="toogleReadOnly"
      >
        <q-tooltip>Basculer en mode previvisualisation ou edition</q-tooltip>
      </q-btn>

      <q-space />

      <q-btn dense round icon="save" color="primary" @click="handleSave">
        <q-tooltip>Enregistrer les modifications</q-tooltip>
      </q-btn>

      <q-space />

      <q-btn
        dense
        round
        color="positive"
        icon="done_all"
        @click="handleFinished"
      >
        <q-tooltip>Termner</q-tooltip>
      </q-btn>
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
import { useUpdateModel } from 'src/services/model/useUpdateModel';
import { defineComponent, ref } from 'vue';

import { modelState, toogleReadOnly } from './model';

export default defineComponent({
  name: 'ModelHeader',
  components: {},
  setup: () => {
    const { submit, updateModelArgs } = useUpdateModel();

    const confirm = ref(false);

    function handleSave() {
      submit();
    }

    function handleFinished() {
      confirm.value = true; //s'il y aeu modification
    }

    function handleConfirm(accept: boolean) {
      switch (accept) {
        case true:
          handleSave();
          break;
        case false:
          break;
      }

      modelState.panelName = 'list';
    }

    return {
      modelState,
      toogleReadOnly,
      handleConfirm,
      confirm,
      handleFinished,
      handleSave,
    };
  },
});
</script>
