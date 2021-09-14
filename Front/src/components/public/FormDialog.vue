<template>
  <q-dialog v-model="openValue" style="background: none">
    <form-card
      :formCardStyle="formCardStyle"
      :title="title"
      style="border: 5px solid #00000078"
    >
      <slot></slot>
    </form-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext } from 'vue';

export default defineComponent({
  name: 'FormDialog',
  components: {
    FormCard: require('./FormCard.vue').default,
  },
  props: {
    open: Boolean,
    title: String,
    formCardStyle: {
      default: 'width: 100%; height: 100%',
    },
  },
  setup(props, { emit }: SetupContext) {
    const openValue = computed({
      get: () => props.open,
      set: (val) => emit('update:open', val),
    });
    return { openValue };
  },
});
</script>
