<template>
  <q-card :style="formCardStyle">
    <q-item-label
      header
      class="label bg-primary text-bold text-center text-white full-width"
      style="height: 45px"
    >
      <div>{{ title }}</div>

      <q-space v-if="add" />

      <slot v-if="add" name="addBtn"></slot>

      <q-btn
        v-if="add && !$slots.addBtn"
        dense
        round
        color="white"
        text-color="primary"
        icon="add"
        @click="$emit('onAddClick')"
      />
    </q-item-label>

    <q-separator />

    <q-card-section class="no-padding" style="height: calc(100% - 46px)">
      <slot> </slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormCard',
  props: {
    title: String,
    add: {
      default: false,
    },
    padding: {
      default: true,
    },
    formCardStyle: {
      default: 'width: 100%; height: 100%',
    },
  },
});
</script>

<style scoped>
.label {
  font-weight: 900;
  position: relative;
  text-align: center;
  height: 6%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
