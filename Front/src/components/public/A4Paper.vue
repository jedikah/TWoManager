<template>
  <div
    style="width: 210mm; height: 297mm; background: white"
    :id="'printPv-' + name"
  >
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
