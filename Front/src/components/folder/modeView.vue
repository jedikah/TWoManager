<template>
  <div
    style="padding: 5px; width: 74%;  margin-left: 1%; height: 95%; overflow: hidden; background: #eaeaea "
    class=" flex-center row justify-content items-center "
  >
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style=" height: 100%; width: 210mm;"
    >
      <div
        style="width: 210mm; min-width: 210mm;
    height: 297mm;  background: white "
        id="printPv"
      >
        <PvView />
      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { scrollAreaStyle } from '../../module/scrollAreaStyle';

export default defineComponent({
  name: 'ModelView',
  components: {
    PvView: require('./ModelView.PV').default
  },
  setup() {
    return { scrollAreaStyle };
  }
});
</script>

<style></style>
