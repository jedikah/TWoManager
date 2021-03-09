<template>
  <q-card>
    <q-card-section>
      <q-card-section horizontal>
        <div>
          <div class="text-overline">Liste des modeles</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Liste</div>
        </div>
        <q-space />
        <div>
          <q-btn
            round
            color="amber"
            glossy
            text-color="black"
            icon="add"
            @click="handleOpenAddModelForm"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section horizontal class="q-pt-xs" style="padding: 5px">
        <!-- //Liste de PV -->

        <ModelCard
          v-for="model in models"
          :key="model.modelId"
          :name="model.name"
          :title="model.name"
          :overline="model.label"
          style="margin: 5px 10px"
          @click="() => handleOpenMorcellement(model.name)"
        />
      </q-card-section>
      <q-separator />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { formsDrawer } from 'src/layouts/MainLayout.vue';
import { useAddModel } from 'src/services/model/useAddModel';
import { useModel } from 'src/services/model/useModels';
import { defineComponent } from 'vue';
import { modelFormBtn } from './ModelForm.vue';

export default defineComponent({
  name: 'ModelListView',
  components: {
    ModelCard: require('../public/ModelCard.vue').default,
  },
  setup: () => {
    const {
      modelsVariable,
      loadingModels,
      models,
      editorViewerState,
    } = useModel();

    const {} = useAddModel();
    function handleOpenMorcellement(currentModel: string) {
      editorViewerState.currentModel = currentModel;
      editorViewerState.panelMode = 'editor';
    }

    function handleOpenAddModelForm() {
      formsDrawer.value = true;
      modelFormBtn.value = 'add';
    }

    return { handleOpenMorcellement, models, handleOpenAddModelForm };
  },
});
</script>
