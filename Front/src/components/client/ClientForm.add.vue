<template>
  <FormCard title="Ajouter un Client">
    <q-form
      @submit.prevent="submit"
      @reset="
        addClientsVariable.input.name = '';
        addClientsVariable.input.domicile = '';
        addClientsVariable.input.contact = '';
      "
      class="full-width"
    >
      <div class="row">
        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="addClientsVariable.input.name"
          label="Nom complet *"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Ce champ ne doit pas être vide.',
          ]"
        />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="addClientsVariable.input.domicile"
          label="Domicile"
        />

        <q-separator class="q-ma-sm col-12" />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="addClientsVariable.input.contact"
          unmasked-value
          mask="### ## ### ##"
          fill-mask="#"
          label="Contact"
        />

        <q-separator class="q-ma-sm col-12" />

        <q-btn-group rounded class="col-12">
          <q-btn
            class="col-6"
            rounded
            label="Valider"
            type="submit"
            color="amber"
          />
          <q-btn
            class="col-6"
            rounded
            label="Reset"
            color="orange"
            type="reset"
          />
        </q-btn-group>
      </div>
    </q-form>
  </FormCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAddClients } from '../../services/clients/useAddClients';
import FormCard from '../public/FormCard.vue';

export default defineComponent({
  name: 'clientAddForm',
  components: {
    FormCard,
  },
  setup: () => {
    const { addClientsVariable, submit } = useAddClients();

    return {
      addClientsVariable,
      submit,
    };
  },
});
</script>
