// import { reactive, computed, watchEffect } from 'vue';
import { ref } from '@vue/composition-api';

export function useTest() {
  const x = ref(2);

  const f = () => {
    x.value++;
  };

  return [x, f];
}

export const value = {
  firstName: 'John',
  lastName: 'Doe',
  language: '',
  get lang() {
    return this.language;
  },
  set lang(lang) {
    this.language = lang;
  }
};
