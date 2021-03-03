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
          v-model="selectClientModel"
          :loading="loadingSearch"
          use-input
          @new-value="createValue"
          :options="searchOptions"
          @filter="filterClient"
        />

        <q-separator class="q-ma-sm col-12" />

        <q-input
          class="col-6"
          dense
          v-model="state.register"
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
          v-model="state.numTitle"
          label="Numero de titre"
          :rules="['']"
        />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="state.groundName"
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
          v-model="state.localisationTrav"
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
          v-model="state.fokontany"
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
          v-model="state.typeTrav"
          :options="typeTravOptions"
          label="Type de travaux *"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Ce champ ne doit pas être vide.',
          ]"
        />

        <DateTimePicker
          class="col-12"
          val="2019-02-01 12:06"
          v-model:val="state.dateTrav"
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
import { Notify } from 'quasar';
import { defineComponent, Ref, ref, watch } from 'vue';

import { scrollAreaStyle } from '../../utils/scrollAreaStyle';
import { useClientSearch } from '../../services/clients/useClientSearch';
import { useAddFolder } from '../../services/folders/useAddFolder';
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
      result,
      state: searchState,
      searchOptions,
      handleClientFormSearch,
      loading: loadingSearch,
    } = useClientSearch();

    const { state, submit } = useAddFolder();

    const typeTravOptions = ['Délimitation', 'Bornage'];

    const selectClientModel: Ref<{ label: string; value: string }> = ref();

    watch(selectClientModel, (val) => (state.clientId = parseInt(val.value)));

    function filterClient(val: any, update: any) {
      update(() => {
        if (val === '') {
          handleClientFormSearch('');
        } else {
          handleClientFormSearch(val);
        }
      });
    }

    function createValue(val: any, done: any) {
      console.log(val);
      if (val.length > 2) {
        if (!searchOptions.value.includes(val)) {
          done(val, 'toggle');
        }
      }
    }

    return {
      state,
      result,
      searchOptions,
      typeTravOptions,
      filterClient,
      createValue,
      selectClientModel,
      loadingSearch,
      submit,
    };
  },
});
</script>

<style></style>
