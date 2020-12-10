import { createStore } from 'pinia';

interface MainState {
  counter: number;
  name: string;
}

export const useMainStore = createStore({
  // name of the store
  // it is used in devtools and allows restoring state
  id: 'main',
  // a function that returns a fresh state
  state: (): MainState => ({
    counter: 2,
    name: 'Eduardo'
  }),
  // optional getters
  getters: {
    doubleCount(store) {
      console.log({ counter: this.counter, this: this });
      return this.counter;
    }
  },
  // optional actions
  actions: {
    reset(state) {
      // `this` is the store instance
      console.log({ counter: this.counter, this: this });
      this.counter = 0;
    }
  }
});
