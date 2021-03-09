<template>
  <q-page style="">
    <div class="q-pa-md full-height">
      <q-tab-panels
        class="row justify-center full-height full-width"
        v-model="editorViewerState.panelMode"
        animated
      >
        <q-tab-panel name="list">
          <ModelListView />
        </q-tab-panel>

        <q-tab-panel
          name="editor"
          class="column no-padding no-margin justify-center items-center"
        >
          <q-badge
            outline
            color="primary"
            :label="`${editorViewerState.currentModel} : ${
              editorViewerState.viewMode == 'readOnly'
                ? 'Mode lecture'
                : 'Mode édition'
            }`"
          />
          <Viewer style="width: 100%; height: 95%">
            <ModelEditor />
          </Viewer>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { editorViewerState } from '../services/model/useModels';

export default defineComponent({
  name: 'Model',
  components: {
    ModelListView: require('../components/model/ModelListView.vue').default,
    Viewer: require('../components/public/Viewer.vue').default,
    ModelEditor: require('../components/model/ModelEditor.vue').default,
  },
  setup: () => {
    return { editorViewerState };
  },
});
</script>
