<template>
  <q-card class="  columns" style="width: 99%; padding: 15px">
    <q-card-section class="col-1 text-center" style="height: 5%">
      <p class="text-bold">Ajouter un dossier</p>
    </q-card-section>

    <q-card-section class=" q-gutter-lg col">
      <q-form class="q-gutter-md  row full-width" @submit.prevent="submit">
        <div class="col-12" style="margin-bottom: 20px">
          <q-select
            class="col-12 full-width"
            dense
            rounded
            outlined
            label="Client *"
            v-model="selectClientModel"
            :loading="loadingSearch"
            use-input
            use-chips
            input-debounce="0"
            @new-value="createValue"
            :options="clientOptions"
            @filter="filterClient"
            style="width: 250px"
          />
        </div>

        <q-input
          class="col-12"
          dense
          v-model="state.register"
          rounded
          outlined
          label="Numero de registre *"
          :rules="[
            val => (val && val.length > 0) || 'Ce champ ne doit pas être vide.'
          ]"
        />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="state.numTitle"
          label="Numero de titre"
        />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="state.groundName"
          label="Nom de terrain *"
          :rules="[
            val => (val && val.length > 0) || 'Ce champ ne doit pas être vide.'
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
            val => (val && val.length > 0) || 'Ce champ ne doit pas être vide.'
          ]"
        />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="state.fokontany"
          label="Fokontany *"
          :rules="[
            val => (val && val.length > 0) || 'Ce champ ne doit pas être vide.'
          ]"
        />

        <q-select
          class="col-12"
          rounded
          outlined
          v-model="state.typeTrav"
          :options="typeTravOptions"
          label="Type de travaux *"
          :rules="[
            val => (val && val.length > 0) || 'Ce champ ne doit pas être vide.'
          ]"
        />

        <q-date v-model="state.dateTrav" minimal />

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
import {
  computed,
  defineComponent,
  Ref,
  ref,
  watch
} from '@vue/composition-api';
import { useClientSearch } from '../../services/clients/useClientSearch';
import { useAddFolder } from '../../services/folders/useAddFolder';

export default defineComponent({
  name: 'AddFolder',
  setup() {
    const {
      state: searchState,
      searchOptions,
      handleClientFormSearch,
      loading: loadingSearch
    } = useClientSearch();

    const { state, submit } = useAddFolder();

    const clientOptions = computed(() =>
      searchOptions(searchState.clientFormSearch)
    );

    const typeTravOptions = ['Délimitation', 'Bornage'];

    const selectClientModel: Ref<{ label: string; value: string }> = ref();

    watch(selectClientModel, val => (state.clientId = parseInt(val.value)));

    function filterClient(val, update) {
      update(() => {
        if (val === '') {
          handleClientFormSearch('');
        } else {
          handleClientFormSearch(val);
        }
      });
    }

    function createValue(val, done) {
      console.log(val);
      if (val.length > 2) {
        if (!clientOptions.value.includes(val)) {
          done(val, 'toggle');
        }
      }
    }
    return {
      state,
      clientOptions,
      typeTravOptions,
      filterClient,
      createValue,
      selectClientModel,
      loadingSearch,
      submit
    };
  }
});
</script>

<style></style>
