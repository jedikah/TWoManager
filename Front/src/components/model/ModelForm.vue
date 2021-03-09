<template>
  <div style="position: relative; padding-left: 10px">
    <ModelAddForm v-if="modelFormBtn == 'add'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useAddClients } from '../../services/clients/useAddClients';

type ModelFormBtn = null | 'add' | 'update';

export const modelFormBtn: Ref<ModelFormBtn> = ref();

export default defineComponent({
  name: 'clientForm',
  components: {
    ModelAddForm: require('./ModelForm.add.vue').default,
  },
  setup: () => {
    return {
      modelFormBtn,
    };
  },
});
</script>
