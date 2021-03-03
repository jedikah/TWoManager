import { reactive } from 'vue';
import { notifyThis } from '../context';

export const modelState = reactive({
  active: ['', ''],
  isSaved: false,
  mode: 'list',
  titleMode: '',
  pv: {
    morcellement: localStorage.getItem('pv_morcellement') || ''
  }
});

export const useModel = () => {
  function handleChangeContent(val: any) {
    if (modelState.active[0] !== '' && modelState.active[1] !== '') {
      // modelState[modelState.active[0]][modelState.active[1]] = val;
    }
  }

  function checkActiveEditor() {
    if (modelState.active[0] !== '' && modelState.active[1] !== '')
      return modelState.active[0] + '_' + modelState.active[1];

    return null;
  }

  function activeEditorContent() {
    return modelState.active[0] !== '' && modelState.active[1] !== ''
      // ? (modelState[modelState.active[0]][modelState.active[1]] as string)
      // : '';
  }

  function saveModel() {
    localStorage.setItem(checkActiveEditor(), modelState.pv.morcellement);
  }

  function contentIsSaved() {
    // return computed(
    //   () => activeEditorContent() === localStorage.getItem(checkActiveEditor())
    // );
  }

  return {
    modelState,
    handleChangeContent,
    saveModel,
    notifyThis,
    contentIsSaved,
    activeEditorContent
  };
};
