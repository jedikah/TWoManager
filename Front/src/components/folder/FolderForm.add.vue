<template>
  <FormCard title="Ajouter un dossier">
    <q-form
      class="full-width column justify-center items-center"
      style="height: 100%"
      @submit.prevent="submit"
    >
      <div class="row">
        <q-select
          class="col-12"
          dense
          rounded
          outlined
          label="Saisir pour chercher un nom de client *"
          v-model="selectedClient"
          :loading="loadingSearch"
          use-input
          :options="searchOptions"
          @input-value="(value) => handleClientFormSearch(value)"
          @update:modelValue="(option) => handleSelectedClient(option.value)"
          :rules="[
            (option) =>
              (option && option.value.length > 0) ||
              'Ce champ ne doit pas être vide.',
          ]"
        />

        <q-separator class="q-ma-sm col-12" />

        <q-input
          class="col-6"
          dense
          v-model="addFoldersVariable.input.register"
          rounded
          outlined
          label="Numero de registre *"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Ce champ ne doit pas être vide.',
          ]"
        />

        <q-input
          class="col-6"
          dense
          rounded
          outlined
          v-model="addFoldersVariable.input.numTitle"
          label="Numero de titre"
          :rules="['']"
        />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="addFoldersVariable.input.groundName"
          label="Nom de terrain *"
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
          v-model="addFoldersVariable.input.localisationTrav"
          label="Localisation *"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Ce champ ne doit pas être vide.',
          ]"
        />

        <q-input
          class="col-6"
          dense
          rounded
          outlined
          v-model="addFoldersVariable.input.fokontany"
          label="Fokontany *"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Ce champ ne doit pas être vide.',
          ]"
        />

        <q-select
          dense
          class="col-6"
          rounded
          outlined
          v-model="selectedTypeTravs"
          :loading="loadTypetravs"
          :options="typeTravsOption"
          label="Type de travaux *"
          @update:modelValue="(option) => handleSelectedTypeTravs(option.value)"
          :rules="[
            (option) =>
              (option && option.value.length > 0) ||
              'Ce champ ne doit pas être vide.',
          ]"
        />

        <DateTimePicker
          class="col-12"
          :val="date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')"
          v-model:val="addFoldersVariable.input.dateTrav"
        />

        <q-separator class="q-ma-sm col-12" />

        <q-btn-group rounded class="col-12">
          <q-btn class="col-6" dense type="submit" color="amber">Valider</q-btn>
          <q-btn class="col-6" dense color="orange" type="reset">Reset</q-btn>
        </q-btn-group>
      </div>
    </q-form>
  </FormCard>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import { date } from 'quasar';

import { useClientSearch } from '../../services/clients/useClientSearch';
import { useAddFolder } from '../../services/folders/useAddFolder';
import { useTypeTravs } from '../../services/typeTrav/useTypeTravs';
import FormCard from '../public/FormCard.vue';
import DateTimePicker from '../public/DateTimePicker.vue';

export default defineComponent({
  name: 'AddFolder',
  components: {
    FormCard,
    DateTimePicker,
  },
  setup: () => {
    const {
      searchOptions,
      handleClientFormSearch,
      loading: loadingSearch,
    } = useClientSearch();

    const { typeTravsOption, loadTypetravs } = useTypeTravs();

    const { addFoldersVariable, submit } = useAddFolder();

    const selectedClient: Ref<{ label: string; value: string }> = ref();
    const selectedTypeTravs: Ref<{ label: string; value: string }> = ref();

    function handleSelectedClient(clientId: string) {
      addFoldersVariable.input.clientId = parseInt(clientId);
    }

    function handleSelectedTypeTravs(typeTravId: string) {
      addFoldersVariable.input.typeTravId = parseInt(typeTravId);
    }

    return {
      addFoldersVariable,
      searchOptions,
      typeTravsOption,
      handleClientFormSearch,
      selectedClient,
      selectedTypeTravs,
      handleSelectedClient,
      handleSelectedTypeTravs,
      loadingSearch,
      loadTypetravs,
      submit,
      date,
    };
  },
});
</script>

<style></style>

function useTypeTravs(): {} { throw new Error('Function not implemented.'); }
function useTypeTravs(): {} { throw new Error('Function not implemented.'); }
function useTypeTravs(): {} { throw new Error('Function not implemented.'); }
