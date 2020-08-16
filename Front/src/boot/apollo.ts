import VueApollo from 'vue-apollo';
import VueCompositionApi from '@vue/composition-api';
import { boot } from 'quasar/wrappers';
import { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';
import hooks from '@u3u/vue-hooks';

import { apolloClient } from './apolloClient';

export default boot(({ Vue, app }) => {
  Vue.use(hooks);
  Vue.use(VueCompositionApi);
  // Vue.use(VueApollo);

  app.setup = () => {
    provide(DefaultApolloClient, apolloClient);
    return {};
  };
});
