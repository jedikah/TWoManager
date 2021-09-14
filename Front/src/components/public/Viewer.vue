<template>
  <div style="height: 100%; width: 100%">
    <div
      style="
        min-width: 230mm;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #b5b5b5;
      "
      class="flex-center row justify-content items-center"
    >
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 100%; width: 21cm; position: relative"
      >
        <div style="position: relative">
          <div
            style="
              background: white;
              height: 29.7cm;
              width: 21cm;
              padding: 1cm;
              border: 1px solid #b5b5b5;
              position: relative;
            "
            id="printA4"
          >
            <slot></slot>
          </div>

          <div
            style="
              width: 21cm;
              min-height: 19.7cm;
              background: #e6e6e6;
              position: absolute;
              margin: 5px 0;
            "
          ></div>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { scrollAreaStyle } from '../../utils/scrollAreaStyle';

export default defineComponent({
  name: 'ModelView',
  components: {},
  setup: () => {
    return { ...scrollAreaStyle };
  },
});
</script>
