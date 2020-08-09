<template>
  <q-page class="row items-center border-blue  justify-center">
    state: {{ x }}
    <button @click="f">test</button>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { useTest, value } from './test';

@Component({
  name: 'Client',
  setup: props => {
    const [x, f] = useTest();

    return { x, f };
  },
  apollo: {}
})
export default class Client extends Vue {
  private x;

  mounted() {
    console.log({ val: value.language });
    value.language = '12';
    console.log({ val: value.language });
  }
}
</script>
