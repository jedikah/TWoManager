import VueApollo from 'vue-apollo';
import VueCompositionApi from '@vue/composition-api';
import { boot } from 'quasar/wrappers';
import { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';
import Component from 'vue-class-component';

import { apolloClient } from './apolloClient';

export default boot(({ Vue, app }) => {
  Vue.use(VueCompositionApi);
  Vue.use(VueApollo);

  app.setup = () => {
    provide(DefaultApolloClient, apolloClient);
    return {};
  };
  Component.registerHooks([
    'setup',
    'beforeRouteUpdate',
    'beforeRouteEnter',
    'beforeRouteLeave'
  ]);
});
