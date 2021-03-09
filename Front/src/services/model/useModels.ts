import { useQuery, useResult } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive } from 'vue';
import { ref } from 'vue-demi';
import { notifyThere } from '../context';
import { QueryModelsArgs } from './../types';
import { ModelsData, MODELS } from './useModels.gql';


export const modelsVariable = reactive<QueryModelsArgs>({
  input: {
    label: '',
    name: ''
  }
});

interface EditorViewerState {
  panelMode: 'list' | 'editor';
  viewMode: 'readOnly' | 'editable';
  currentModel: string
}

export const editorViewerState = reactive<EditorViewerState>({
  panelMode: 'list',
  viewMode: 'readOnly',
  currentModel: ''
});

export const useModel = () => {

  const {
    loading: loadingModels,
    onResult,
    onError,
    result
  } = useQuery<ModelsData, QueryModelsArgs>(
    MODELS, modelsVariable, {
      fetchPolicy: 'cache-and-network',
    }
  );
  const currentModel = ref('');
  const editedModel = ref('')

  onResult(({ data, errors }) => {
    if (errors) notifyThere(errors);
    console.log({ data })

    if(data.models.length > 0 && editorViewerState.currentModel !== '') {
      currentModel.value =  data.models.find(item => item.name == editorViewerState.currentModel).content;
      editedModel.value =  data.models.find(item => item.name == editorViewerState.currentModel).content;
    }

  });

  onError(error => {
    logErrorMessages(error);
  });

  const models = useResult(result, [], data => data.models)



  return {modelsVariable, loadingModels, models, currentModel, editorViewerState, editedModel}
}
