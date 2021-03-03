// import { createStore } from 'pinia';

// interface MainState {
//   clientFormBtn: string | null;
// }

// export const useMainStore = createStore({
//   // name of the store
//   // it is used in devtools and allows restoring state
//   id: 'main',
//   // a function that returns a fresh state
//   state: (): MainState => ({
//     clientFormBtn: null
//   }),
//   // optional getters
//   getters: {
//     doubleCount(store) {
//       return this.counter;
//     }
//   },
//   // optional actions
//   actions: {
//     reset(state) {
//       // `this` is the store instance
//       console.log({ counter: this.counter, this: this });
//       this.counter = 0;
//     }
//   }
// });
