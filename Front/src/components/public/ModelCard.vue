<template>
  <q-card class="my-card" style="width: 200px">
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">{{ overline }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
        <iframe
          style="width: 165px; height: 100px; border: 1px solid red"
          frameborder="1"
          :src="src"
        ></iframe>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn color="primary" @click="$emit('emitClick_' + name)"
        >Modifier</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModelCard',
  props: {
    name: {
      require: true,
      type: String,
      default: '',
    },
    overline: {
      require: false,
      type: String,
      default: 'Overline',
    },
    title: {
      require: true,
      type: String,
      default: 'Title',
    },
    src: {
      require: false,
      type: String,
      default: '',
    },
  },
  setup: () => {
    return {};
  },
});
</script>
