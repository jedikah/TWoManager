<template>
  <div style="width: 29.7cm; height: 21cm; background: white">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { scrollAreaStyle } from '../../utils/scrollAreaStyle';

export default defineComponent({
  name: 'A4Paper',
  props: {
    name: {
      required: true,
      type: String,
    },
  },
});
</script>

<style></style>
