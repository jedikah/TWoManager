<template>
  <div>
    <clientAddForm v-if="clientFormBtn === 'add'" />
    <clientUpdateForm v-if="clientFormBtn === 'update'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useAddClientByUser } from 'src/services/clients/useAddClientByUser';
import { clientFormBtn } from './clientHeader.vue';

export default defineComponent({
  name: 'clientForm',
  components: {
    clientAddForm: require('./clientForm.add').default,
    clientUpdateForm: require('./clientForm.update').default
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
