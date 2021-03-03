<template>
  <!--Avatar-->
  <div
    class="column justify-center items-center q-gutter-xs"
    style="padding: 0px; margin: 0px"
  >
    <q-avatar :size="size" style="background: #1976d217">
      <q-img :src="src" />
      <q-icon v-if="src === ''" name="face" class="cursor-pointer" />
    </q-avatar>
    <p class="text-h6">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Avatar',
  props: {
    src: {
      required: false,
      type: String,
      default: '',
    },
    size: {
      required: false,
      type: String,
      default: '125',
    },
    name: {
      required: false,
      type: String,
      default: 'Nom et Prenom',
    },
  },
});
</script>
