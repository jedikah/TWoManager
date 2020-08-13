<template>
  <q-card class="  columns" style="padding: 15px">
    <q-card-section class="col-1 text-center">
      <p class="text-bold">Ajouter un Client</p>
    </q-card-section>

    <q-card-section class=" q-gutter-lg col-11">
      <q-input
        dense
        rounded
        outlined
        v-model="clientNameState"
        label="Nom complet *"
        :rules="[
          val => (val && val.length > 0) || 'Ce champ ne doit pas être vide.'
        ]"
      />

      <q-input
        dense
        rounded
        outlined
        v-model="domicileState"
        label="Domicile"
      />

      <q-input
        dense
        rounded
        outlined
        v-model="contactState"
        mask="### ## ### ##"
        fill-mask="*"
        label="Contact"
      />
      <q-btn
        rounded
        label="Valider"
        type="submit"
        color="amber"
        text-color="black"
      />
      <q-btn
        rounded
        label="Reset"
        color="orange"
        text-color="black"
        @click="
          clientNameState = '';
          domicileState = '';
          contactState = '';
        "
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapFields } from 'vuex-map-fields';

@Component({
  name: 'ClientForm',
  computed: {
    ...mapFields({
      clientNameState: 'clientsModule.form.clientName',
      domicileState: 'clientsModule.form.domicile',
      contactState: 'clientsModule.form.contact'
    })
  }
})
export default class ClientForm extends Vue {
  private clientNameState: string;
  private domicileState: string;
  private contactState: string;
}
</script>
