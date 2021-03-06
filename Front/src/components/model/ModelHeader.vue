<template>
  <div class="row justify-center items-center" style="width: 100%">
    <div class="col-10">
      <div class="text-center">Modele</div>
    </div>

    <div class="col-1">
      <q-btn
        icon="save"
        color="secondary"
        @click="handleSaved"
        :disable="modelState.pv.morcellement === getItem"
      />
      {{ contentIsSaved() }}
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
import { defineComponent, ref } from 'vue';
import { useModelState } from 'src/services/model/model.globaleState';

export default defineComponent({
  name: 'ModelHeader',
  components: {},
  setup: () => {
    const {
      modelState,
      saveModel,
      notifyThis,
      contentIsSaved,
      // activeEditorContent,
    } = useModelState();
    const confirm = ref(false);
    const getItem = ref(localStorage.getItem('pv_morcellement'));

    window.addEventListener(
      'storage',
      (e) => {
        console.log(e.storageArea);
      },
      true
    );

    function handleCancel() {
      modelState.pv.morcellement = getItem.value;
    }

    function handleSaved() {
      saveModel();
      // modelState.isSaved = contentIsSaved();
      notifyThis({ message: 'Model enrégistrée.', type: 'positive' });
    }

    function handleFinished() {
      if (modelState.pv.morcellement !== getItem.value) {
        confirm.value = true;
      } else modelState.mode = 'list';
    }

    function handleConfirm(accept: boolean) {
      if (accept) {
        handleSaved();
        modelState.mode = 'list';
      } else {
        handleCancel();
        modelState.mode = 'list';
      }
    }

    return {
      modelState,
      handleConfirm,
      confirm,
      handleFinished,
      handleSaved,
      getItem,
      contentIsSaved,
    };
  },
});
</script>
