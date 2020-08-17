<template>
  <q-page class="row items-center justify-center">
    <div class=" " style="width: 300px; height: 500px">{{}}</div>
  </q-page>
</template>

<script lang="ts">
import {
  ref,
  computed,
  watch,
  toRef,
  reactive,
  defineComponent
} from '@vue/composition-api';

export default defineComponent({
  setup: () => {
    const blabla = 'string';

    const g = computed(() => ({}));

    return { blabla };
  },
  methods: {
    test12: () => this.blabla
  }
});
</script>
