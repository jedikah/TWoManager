<template>
  <client-form
    title="Modifier le client"
    v-model:name="updateClientArgs.input.name"
    v-model:domicile="updateClientArgs.input.domicile"
    v-model:contact="updateClientArgs.input.contact"
    @valider="submit"
  >
    <q-btn
      class="full-width"
      style="margin: 20px"
      rounded
      @click="cancel"
      no-caps
      label="Annuler"
    />
  </client-form>
</template>

<script lang="ts">
import { Client } from 'src/services/types';
import { defineComponent, onMounted, Prop, onUpdated } from 'vue';
import { SetupContext } from 'vue-demi';
import { useUpdateClient } from '../../services/clients/useUpdateClient';

export default defineComponent({
  name: 'clientUpdateForm',
  props: {
    client: Object as Prop<Client>,
  },
  components: {
    clientForm: require('./ClientForm.vue').default,
  },
  setup: (props, { emit }: SetupContext) => {
    const { updateClientArgs, submit } = useUpdateClient();

    onMounted(() => {
      setUpdateClient();
    });

    onUpdated(() => {
      setUpdateClient();
    });

    function setUpdateClient() {
      if (updateClientArgs.input.id !== Number(props.client.id)) {
        updateClientArgs.input.id = Number(props.client.id);
        updateClientArgs.input.name = props.client.name;
        updateClientArgs.input.domicile = props.client.domicile;
        updateClientArgs.input.contact = props.client.contact;
      }
    }

    function cancel() {
      emit('annuler');
    }

    return {
      updateClientArgs,
      submit,
      cancel,
    };
  },
});
</script>
