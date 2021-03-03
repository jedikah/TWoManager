<template>
  <div style="height: 95%; width: 100%" class="column no-padding">
    <div
      style="
        padding: 5px;
        min-width: 230mm;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #f9f9f9;
      "
      class="flex-center row justify-content items-center"
    >
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 100%; width: 850px; padding: 15px"
      >
        <slot></slot>
      </q-scroll-area>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { scrollAreaStyle } from '../../utils/scrollAreaStyle';
// import A4Paper from '../public/A4Paper.vue';

export default defineComponent({
  name: 'ModelView',
  components: {
    // A4Paper: require('../public/A4Paper.vue').default,
    // Test: require('../pv/Test.vue').default,
  },
  setup: () => {
    return { ...scrollAreaStyle };
  },
});
</script>

<style></style>
