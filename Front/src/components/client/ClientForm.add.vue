<template>
  <client-form
    title="Ajouter un Client"
    v-model:name="addClientsArgs.input.name"
    v-model:domicile="addClientsArgs.input.domicile"
    v-model:contact="addClientsArgs.input.contact"
    @valider="submit"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SetupContext } from 'vue-demi';
import { useAddClients } from '../../services/clients/useAddClients';

export default defineComponent({
  name: 'clientAddForm',
  components: {
    clientForm: require('./ClientForm.vue').default,
  },
  setup: () => {
    const { addClientsArgs, submit } = useAddClients();

    return {
      addClientsArgs,
      submit,
    };
  },
});
</script>
