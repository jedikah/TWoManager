<template>
  <div>
    <q-card class="my-card" style="width: 250px">
      <q-card-section style="padding-top: 0">
        <div
          class="text-overline full-width"
          style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
        >
          {{ overline }}
        </div>
        <div class="text-h6 full-width">{{ title }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="flex justify-center">
        <q-avatar
          square
          size="160px"
          font-size="82px"
          color="teal"
          text-color="white"
          icon="directions"
          style="margin: auto"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-btn color="primary" @click="$emit('click')">Modifier</q-btn>
      </q-card-actions>
    </q-card>
  </div>
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
