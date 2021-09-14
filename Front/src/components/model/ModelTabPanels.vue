<template>
  <q-tab-panels
    class="row justify-center full-height full-width"
    v-model="modelState.panelName"
    animated
  >
    <q-tab-panel name="list">
      <ModelListView :models="models" />
    </q-tab-panel>

    <q-tab-panel
      name="editor"
      class="column no-padding no-margin justify-center items-center"
      style="height: calc(100vh - 48px)"
    >
      <q-badge
        outline
        color="primary"
        style="margin: 5px"
        :label="modelState.readOnly ? 'Mode lecture' : 'Mode édition'"
      />
      <Viewer style="width: 100%; height: 95%">
        <ModelBuilder v-model="updateModelArgs.input.content" />
      </Viewer>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts">
import { useModel } from 'src/services/model/useModels';
import { defineComponent } from 'vue';
import { updateModelArgs } from '../../services/model/useUpdateModel';

import { modelState } from './model';

export default defineComponent({
  name: 'ModelTabPanels',
  components: {
    ModelListView: require('./ModelListView.vue').default,
    Viewer: require('../public/Viewer.vue').default,
    ModelBuilder: require('./ModelBuilder.vue').default,
  },
  setup: () => {
    const { modelsVariable, loadingModels, models } = useModel();

    return { modelState, models, updateModelArgs };
  },
});
</script>
