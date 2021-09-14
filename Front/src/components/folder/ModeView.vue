<template>
  <q-card class="full-height">
    <Viewer>
      <q-btn color="primary">test</q-btn>
    </Viewer>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { scrollAreaStyle } from '../../utils/scrollAreaStyle';
export default defineComponent({
  name: 'ModelView',
  components: {
    Viewer: require('../public/Viewer.vue').default,
  },
  setup: () => {
    return { ...scrollAreaStyle };
  },
});
</script>

<style></style>
