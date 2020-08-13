<template>
  <q-page class="row items-center justify-center">
    <div class=" " style="width: 300px; height: 500px">{{}}</div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import { ref, computed } from '@vue/composition-api';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import { useTest, value } from './test';

type Prop = {
  mySetup: () => void;
};

const ClientProperty = Vue.extend({
  props: {
    mySetup: () => {
      console.log('mysetup');
    }
  },
  setup: (props: Prop, { root }) => {
    const [x, f] = useTest();

    const count = ref(1);

    const plusOne = computed(() => count.value * 2);

    return { x, f };
  },

  methods: { ...mapActions('clientsModule', { test: 'test' }) }
});

@Component({
  name: 'Client',
  components: {
    clienform: require('src/components/client/ClientForm').default
  }
})
export default class Client extends ClientProperty {
  private text = 'test';

  data() {
    return {
      test2: 'blablabl'
    };
  }

  // setup(prop) {
  //   console.log({ setup: 'bdqsjhgdqsg' });
  // }

  mounted() {
    // this.se;
    console.log({ val: value.language });
    value.language = '12';
    // console.log({
    //   val: useQuery(
    //     gql`
    //       query Login($input: LoginInput!) {
    //         login(input: $input) {
    //           token
    //           type
    //         }
    //       }
    //     `,
    //     {
    //       input: {
    //         login: 'jedikah',
    //         password: '123'
    //       }
    //     }
    //   )
    // });
  }
}
</script>
