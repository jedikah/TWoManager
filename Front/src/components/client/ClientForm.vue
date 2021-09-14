<template>
  <form-card :title="title">
    <q-form @submit.prevent="submit" @reset="reset" class="full-width q-pa-md">
      <div class="row">
        <q-input
          class="col-12"
          dense
          rounded
          outlined
          v-model="nameValue"
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
          v-model="domicileValue"
          label="Domicile"
        />

        <q-separator class="q-ma-sm col-12" />

        <q-input
          class="col-12"
          dense
          rounded
          outlined
          type="text"
          v-model="contactValue"
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
        <slot></slot>
      </div>
    </q-form>
  </form-card>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext } from 'vue';

export default defineComponent({
  name: 'clientForm',
  components: {
    formCard: require('../public/FormCard.vue').default,
  },
  props: {
    name: String,
    domicile: String,
    contact: String,
    title: String,
  },
  emits: ['update:name', 'update:domicile', 'update:contact'],
  setup: (props, { emit }: SetupContext) => {
    const nameValue = computed({
      get: () => props.name,
      set: (val) => emit('update:name', val),
    });

    const domicileValue = computed({
      get: () => props.domicile,
      set: (val) => emit('update:domicile', val),
    });

    const contactValue = computed({
      get: () => props.contact,
      set: (val) => emit('update:contact', val),
    });

    function submit() {
      emit('valider');
    }

    function reset() {
      nameValue.value = '';
      domicileValue.value = '';
      contactValue.value = '';
      emit('reset');
    }

    return {
      nameValue,
      contactValue,
      domicileValue,
      submit,
      reset,
    };
  },
});
</script>
