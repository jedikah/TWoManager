<template>
  <div style="position: relative; padding-left: 10px">
    <ClientAddForm v-if="clientFormBtn === 'add'" />
    <ClientUpdateForm v-if="clientFormBtn === 'update'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useAddClients } from '../../services/clients/useAddClients';

type ClientFormBtn = null | 'add' | 'update';

export const clientFormBtn: Ref<ClientFormBtn> = ref();

export default defineComponent({
  name: 'clientForm',
  components: {
    ClientAddForm: require('./ClientForm.add.vue').default,
    ClientUpdateForm: require('./ClientForm.update.vue').default,
  },
  setup: () => {
    return {
      clientFormBtn,
    };
  },
});
</script>
