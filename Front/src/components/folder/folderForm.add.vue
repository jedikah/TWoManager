<template>
  <q-card class="  columns" style="width: 99%; padding: 15px">
    <q-card-section class="col-1 text-center" style="height: 5%">
      <p class="text-bold">Ajouter un dossier</p>
    </q-card-section>

    <q-card-section class=" q-gutter-lg col">
      <q-form class="q-gutter-md  row full-width">
        <q-select
          class="col-12"
          rounded
          outlined
          value="Google"
          :options="clientOptions"
          label="Client"
        />

        <q-input
          class="col-12"
          dense
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
          label="Numero de titre *"
          :rules="[
            val => (val && val.length > 0) || 'Ce champ ne doit pas être vide.'
          ]"
        />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
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
          label="Fokontany *"
          :rules="[
            val => (val && val.length > 0) || 'Ce champ ne doit pas être vide.'
          ]"
        />

        <q-select
          class="col-12"
          rounded
          outlined
          value="Google"
          :options="clientOptions"
          label="Type de travaux"
        />

        <q-date v-model="date" minimal />

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

export default defineComponent({
  name: 'AddFolder',
  setup() {
    return {
      clientOptions: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      date: '2019/02/01'
    };
  }
});
</script>

<style></style>
