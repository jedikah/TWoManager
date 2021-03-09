<template>
  <FormCard title="Ajouter un model">
    <q-form
      @submit.prevent="submit"
      @reset="
        addModelVariable.input.name = '';
        addModelVariable.input.label = '';
      "
      class="full-width"
    >
      <div class="row">
        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="addModelVariable.input.name"
          label="nom: (Ex: Delimitation ou Bornage_prealable)"
          maxlength="25"
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
          v-model="addModelVariable.input.label"
          maxlength="50"
          label="Label: (Ex: Model de Pv de délimitation)"
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
import { useAddModel } from 'src/services/model/useAddModel';
import { defineComponent } from 'vue';
import FormCard from '../public/FormCard.vue';

export default defineComponent({
  name: 'ModelAddForm',
  components: {
    FormCard,
  },
  setup: () => {
    const { addModelVariable, submit } = useAddModel();

    return {
      addModelVariable,
      submit,
    };
  },
});
</script>
