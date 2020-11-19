<template>
  <div>
    <q-btn-group push flat dense>
      <q-btn
        push
        label="First"
        icon="timeline"
        @click="handleChange('update')"
      />
      <q-btn push label="Ajouter client" @click="handleChange('add')" />
    </q-btn-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { formsDrawer } from 'src/layouts/MainLayout.vue';

export const clientFormBtn = ref('add');

export default defineComponent({
  name: 'clientHeader',
  components: {},
  setup: () => {
    const handleChange = (btn: string) => {
      formsDrawer.value = true;
      clientFormBtn.value = btn;
    };

    return { formsDrawer, clientFormBtn, handleChange };
  }
});
</script>
