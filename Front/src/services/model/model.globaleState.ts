import { modelState } from './model.globaleState';
import { reactive } from 'vue';
import { computed } from 'vue-demi';
import { notifyThis } from '../context';


type ModelName = 'morcellement' | 'bornage'
type ViewMode = 'readOnly' | 'editable'

interface Model {
  viewMode: ViewMode;
  titleMode: string;
  texte: string
}

interface ModelState {
  panelMode: 'liste' | 'editor';
  morcellement: Model
}

const modelState = reactive<ModelState>({
  panelMode: 'liste',
  morcellement: {
    viewMode: 'readOnly',
    titleMode: 'PV de Morcellement',
    texte: ''
  }
});

export const useModel = (pvName: ModelName | void) => {
  //  GETTER

  const viewMode = computed(() => {
    switch(pvName){
      case 'morcellement':
        return modelState[pvName].viewMode
    }
  })

  const titleMode = () => {
    switch(pvName){
      case 'morcellement':
        return modelState[pvName].viewMode
    }
  }

  const text = computed(() => {
    switch(pvName){
      case 'morcellement':
        return modelState.morcellement
    }
  })

  // SETTER
  function setText( text: string) {
    switch(pvName){
      case 'morcellement':
        modelState[pvName].texte = text
        break
    }
  }

  function setMode(viewMode: ViewMode) {
    switch(pvName){
      case 'morcellement':
        modelState[pvName].viewMode = viewMode
    }
  }


if(pvName)
  return {
    viewMode,
    titleMode,
    text,
    setText,
    setMode
  }
else
return {
  modelState
}
};
