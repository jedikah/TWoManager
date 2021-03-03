<template>
  <q-page>
    <q-tab-panels
      class="q-pa-md row justify-center"
      style="height: 94%; width: 100%"
      v-model="modelState.mode"
      animated
    >
      <q-tab-panel name="list">
        <PvModelList />
      </q-tab-panel>

      <q-tab-panel
        name="modelEditor"
        class="column no-padding no-margin justify-center items-center"
      >
        <q-badge outline color="primary" :label="modelState.titleMode" />
        <Viewer style="width: 100%; height: 95%">
          <Editor
            :value="modelState.pv.morcellement"
            editorName="pv_morcellement"
            v-on:contentChange="handleChangeContent"
          />
        </Viewer>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useModel } from '../services/model/model.globaleState';

export default defineComponent({
  name: 'Model',
  components: {
    PvModelList: require('../components/model/PvModelList.vue').default,
    Viewer: require('../components/public/Viewer.vue').default,
    // A4Paper: require('../components/public/A4Paper.vue').default,
    Editor: require('../components/public/Editor.vue').default,
    // PvMorcellementEditor: require('../components/model/PvMorcellementEditor.vue').default,
  },
  setup: () => {
    const { handleChangeContent, modelState } = useModel();

    return { modelState, handleChangeContent };
  },
});
</script>
