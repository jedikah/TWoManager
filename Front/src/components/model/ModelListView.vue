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
            @click="() => {}"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section horizontal class="q-pt-xs" style="padding: 5px">
        <!-- //Liste de PV -->

        <ModelCard
          v-for="model in models"
          :key="model.id"
          :name="model.name"
          :title="model.name"
          :overline="model.label"
          style="margin: 5px 10px"
          @click="() => handleOpenMorcellement(model)"
        />
      </q-card-section>
      <q-separator />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useAddModel } from 'src/services/model/useAddModel';
import { defineComponent, PropType } from 'vue';
import { modelState } from './model';
import { Model } from 'src/services/types';
import { updateModelArgs } from '../../services/model/useUpdateModel';

export default defineComponent({
  name: 'ModelListView',
  props: {
    models: {
      type: Array as PropType<Model[]>,
      require: true,
    },
    loading: {
      default: false,
    },
  },
  components: {
    ModelCard: require('../public/ModelCard.vue').default,
  },
  setup: () => {
    const {} = useAddModel();
    function handleOpenMorcellement(currentModel: Model) {
      updateModelArgs.input.content = currentModel.content;
      updateModelArgs.input.label = currentModel.label;
      updateModelArgs.input.id = currentModel.id;
      updateModelArgs.input.name = currentModel.name;
      modelState.panelName = 'editor';
    }

    return {
      modelState,
      handleOpenMorcellement,
    };
  },
});
</script>
