<template>
  <Viewer>
    <A4Paper id="test" name="morcellement" style="padding: 30px">
      <!-- <div v-html="modelState.pv.morcellement"></div> -->
      <q-btn color="primary">test</q-btn>
    </A4Paper>
  </Viewer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModel } from 'src/services/model/model.globaleState';
import { scrollAreaStyle } from '../../utils/scrollAreaStyle';
export default defineComponent({
  name: 'ModelView',
  components: {
    Viewer: require('../public/Viewer.vue').default,
    A4Paper: require('../public/A4Paper.vue').default,
    // Test: require('../pv/Test.vue'),
  },
  setup: () => {
    const { modelState } = useModel();
    return { ...scrollAreaStyle, modelState };
  },
});
</script>

<style></style>
