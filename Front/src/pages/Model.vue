<template>
  <q-page style="">
    <div class="full-height">
      <model-tab-panels />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Model',
  components: {
    ModelTabPanels: require('../components/model/ModelTabPanels.vue').default,
  },
  setup: () => {
    return {};
  },
});
</script>
