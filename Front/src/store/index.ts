import { store } from 'quasar/wrappers';
import Vuex from 'vuex';
import { getField, updateField } from 'vuex-map-fields';

import RootState from './types';
import { sessionModule } from './session/sessionModule.store';

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<RootState>({
    state: {
      version: '1.0.0'
    },
    modules: {
      sessionModule
    },
    actions: {},
    getters: { getField },
    mutations: { updateField },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  });

  return Store;
});
