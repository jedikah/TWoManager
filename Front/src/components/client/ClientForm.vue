<template>
  <div style=" padding-top: 20vh;">
    <ClientAddForm v-if="clientFormBtn === 'add'" />
    <ClientUpdateForm v-if="clientFormBtn === 'update'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useAddClientByUser } from '../../services/clients/useAddClientByUser';
import { clientFormBtn } from './ClientHeader.vue';

export default defineComponent({
  name: 'clientForm',
  components: {
    ClientAddForm: require('./ClientForm.add').default,
    ClientUpdateForm: require('./ClientForm.update').default
  },
  setup: () => {
    const [state, submitAddClient] = useAddClientByUser();

    return {
      state,
      submitAddClient,
      clientFormBtn
    };
  }
});
</script>
