<template>
  <form-dialog
    :formCardStyle="formCardStyle"
    :title="title"
    v-model:open="openValue"
  >
    <q-form
      class="full-width"
      @submit.prevent="$emit('submit')"
      @reset.prevent="reset"
    >
      <q-card class="">
        <q-card-section class="flex row no-margin">
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
            :rules="[
              (option) =>
                (option && option.value) || 'Ce champ ne doit pas être vide.',
            ]"
          />

          <q-input
            class="col-6"
            dense
            v-model="registerValue"
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
            v-model="numTitleValue"
            label="Numero de titre"
            :rules="['']"
          />

          <q-input
            class="col-12"
            dense
            rounded
            outlined
            v-model="groundNameValue"
            label="Nom de terrain *"
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
            v-model="localisationTravValue"
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
            v-model="fokontanyValue"
            label="Fokontany *"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Ce champ ne doit pas être vide.',
            ]"
          />

          <q-select
            dense
            class="col-12"
            rounded
            outlined
            v-model="selectedTypeTravs"
            :loading="loadTypetravs"
            :options="typeTravsOption"
            label="Type de travaux *"
            :rules="[
              (option) =>
                (option && option.value) || 'Ce champ ne doit pas être vide.',
            ]"
          />

          <date-time-picker
            class="col-12"
            :val="date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')"
            v-model:val="dateTravValue"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn-group rounded class="col-12">
            <q-btn class="col-6" dense type="submit" color="amber">
              Valider
            </q-btn>
            <q-btn class="col-6" dense color="orange" type="reset">
              Reset
            </q-btn>
          </q-btn-group>
        </q-card-actions>
      </q-card>
    </q-form>
  </form-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, SetupContext } from 'vue';

import { useAddFolder } from '../../services/folders/useAddFolder';
import { useTypeTravs } from '../../services/typeTrav/useTypeTravs';
import { useClientSearch } from '../../services/clients/useClientSearch';

import { date } from 'quasar';

export default defineComponent({
  name: 'folderForm',
  components: {
    FormDialog: require('../public/FormDialog.vue').default,
    DateTimePicker: require('../public/DateTimePicker.vue').default,
  },
  props: {
    open: Boolean,
    modelValue: Boolean,
    title: String,
    register: String,
    numTitle: String,
    groundName: String,
    localisationTrav: String,
    fokontany: String,
    dateTrav: String,
    formCardStyle: {
      default: 'width: 100%; height: 100%',
    },
  },
  setup: (props, { emit }: SetupContext) => {
    const openValue = computed({
      get: () => props.open,
      set: (val) => emit('update:open', val),
    });

    const registerValue = computed({
      get: () => props.register,
      set: (val) => emit('update:register', val),
    });

    const numTitleValue = computed({
      get: () => props.numTitle,
      set: (val) => emit('update:numTitle', val),
    });

    const groundNameValue = computed({
      get: () => props.groundName,
      set: (val) => emit('update:groundName', val),
    });

    const localisationTravValue = computed({
      get: () => props.localisationTrav,
      set: (val) => emit('update:localisationTrav', val),
    });

    const fokontanyValue = computed({
      get: () => props.fokontany,
      set: (val) => emit('update:fokontany', val),
    });

    const dateTravValue = computed({
      get: () => props.dateTrav,
      set: (val) => emit('update:dateTrav', val),
    });

    const { typeTravsOption, loadTypetravs } = useTypeTravs();
    const {
      searchOptions,
      handleClientFormSearch,
      loading: loadingSearch,
    } = useClientSearch();

    function reset() {
      registerValue.value = null;
      numTitleValue.value = null;
      groundNameValue.value = null;
      localisationTravValue.value = null;
      fokontanyValue.value = null;
      dateTravValue.value = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss');
    }

    return {
      openValue,
      selectedClient: ref(),
      selectedTypeTravs: ref(),
      typeTravsOption,
      registerValue,
      numTitleValue,
      groundNameValue,
      localisationTravValue,
      fokontanyValue,
      dateTravValue,
      loadTypetravs,
      searchOptions,
      handleClientFormSearch,
      loadingSearch,
      date,
      reset,
    };
  },
});
</script>
