<template>
  <q-card class="  columns" style="width: 99%; padding: 15px">
    <q-card-section class="col-1 text-center" style="height: 5%">
      <p class="text-bold">Ajouter un Client</p>
    </q-card-section>

    <q-card-section class=" q-gutter-lg col">
      <q-form
        @submit="submitAddClient()"
        @reset="
          state.clientName = '';
          state.domicile = '';
          state.contact = '';
        "
        class="q-gutter-md  row full-width"
      >
        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="state.clientName"
          label="Nom complet *"
          :rules="[
            val => (val && val.length > 0) || 'Ce champ ne doit pas être vide.'
          ]"
        />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="state.domicile"
          label="Domicile"
        />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="state.contact"
          unmasked-value
          mask="### ## ### ##"
          fill-mask="#"
          label="Contact"
        />
        <q-btn
          class="col-5"
          rounded
          label="Valider"
          type="submit"
          color="amber"
        />
        <q-btn
          class="col-5"
          rounded
          label="Reset"
          color="orange"
          type="reset"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useMainStore } from 'src/store/client/clientModule.store';
import { useAddClientByUser } from '../../services/clients/useAddClientByUser';

export default defineComponent({
  name: 'clientAddForm',
  setup: () => {
    const [state, submitAddClient] = useAddClientByUser();

    return {
      state,
      submitAddClient
    };
  }
});
</script>
