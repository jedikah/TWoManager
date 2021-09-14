import { reactive } from 'vue';

interface State {
  readOnly: boolean;
  panelName: 'list' | 'editor';
}

const modelState = reactive<State>({
  readOnly: false,
  panelName: 'list',
});

function toogleReadOnly() {
  modelState.readOnly = !modelState.readOnly;
}

export { modelState, toogleReadOnly };
