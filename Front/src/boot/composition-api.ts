import VueCompositionApi from '@vue/composition-api';
import { boot } from 'quasar/wrappers';
import { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';
import hooks from '@u3u/vue-hooks';
import { apolloClient } from 'src/services/applloClient';

export default boot(({ Vue, app }) => {
  Vue.use(hooks);
  Vue.use(VueCompositionApi);

  app.setup = () => {
    provide(DefaultApolloClient, apolloClient);
    return {};
  };
});
