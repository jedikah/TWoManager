<template>
  <div v-html="modelState.pv.morcellement"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useSession } from 'src/services/session/useSession';
// import { dateParse } from '../../utils/dateParse';

import { modelState } from '../../services/model/model.globaleState';

export default defineComponent({
  name: 'Test',
  setup() {
    return { modelState };
  },
});
</script>

<style>
.paddingA4 {
  padding: 50px;
}
</style>
