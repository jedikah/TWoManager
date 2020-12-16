<template>
  <div style=" width: 99%; height: 100%; overflow: hidden; padding-top: 2%;">
    <q-item-label
      header
      style=" font-weight: 900; font-size: 1.2em; text-align: center; height: 6%; margin-bottom: 1%"
      >Ajouter un dossier</q-item-label
    >
    <q-separator />

    <q-form
      class=" full-width column justify-center items-center "
      style="height: 94%;"
      @submit.prevent="submit"
    >
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        class="row full-width "
        style="padding-left: 40px; padding-right: 40px; height: 92%; min-height: 500px"
      >
        <q-select
          class="col-12 full-width"
          style="margin-bottom: 20px"
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
        />

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
          style="margin-bottom: 20px"
          dense
          rounded
          outlined
          v-model="state.numTitle"
          label="Numero de titre"
          :rules="[]"
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
          dense
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

        <div class="row full-width justify-center">
          <q-date class=" full-width" v-model="state.dateTrav" minimal />
        </div>
      </q-scroll-area>

      <div
        class=" column full-width justify-center items-center"
        style="height: 8%; position: sticky"
      >
        <q-separator />
        <q-btn-group rounded style="margin-top: 5px;">
          <q-btn dense type="submit" color="amber">Valider</q-btn>
          <q-btn dense color="orange" type="reset">Reset</q-btn>
        </q-btn-group>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  ref,
  watch
} from '@vue/composition-api';

import { scrollAreaStyle } from '../../module/scrollAreaStyle';
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
      submit,
      ...scrollAreaStyle
    };
  }
});
</script>

<style></style>
