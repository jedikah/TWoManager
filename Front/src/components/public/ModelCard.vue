<template>
  <q-card class="my-card" style="width: 200px">
    <q-card-section horizontal>
      <q-card-section class="flex justify-center">
        <div class="text-overline full-width">{{ overline }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs full-width">{{ title }}</div>
        <div>
          <q-avatar
            square
            size="160px"
            font-size="82px"
            color="teal"
            text-color="white"
            icon="directions"
            style="margin: auto"
          />
        </div>
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
