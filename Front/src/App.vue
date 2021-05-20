<template>
  <router-view />
</template>
<script lang="ts">
import { DefaultApolloClient } from 'app/node_modules/@vue/apollo-composable/dist';
import { defineComponent, provide } from 'vue';
import { apolloClient } from './services/applloClient';

export default defineComponent({
  name: 'App',
  setup() {
    // const $htmlToPaper = inject('$htmlToPaper');
    provide(DefaultApolloClient, apolloClient);

    return {};
  },
});
</script>
