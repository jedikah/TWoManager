<template>
  <q-card
    class="columns"
    style="width: 100%; padding: 20px 0 10px 0; height: 100%"
  >
    <q-card-section class="text-center" style="height: 40px">
      <p class="text-bold">{{ title }}</p>
    </q-card-section>
    <q-separator />

    <q-card-section
      style="height: 100%; padding-left: 15px; padding-right: 15px"
    >
      <slot> </slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'clientAddForm',
  props: ['title'],
});
</script>
