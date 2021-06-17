<template>
  <q-card>
    <q-card-section>
      <q-card-section>
        <div class="text-overline">Model de Procès-verbale</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Liste</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pt-xs">
        <div>
          <!-- //Liste de PV -->

          <ModelCard
            name="morcellement"
            title="Morcellement"
            overline="Model de pv"
            v-on:emitClick_morcellement="handleMorcellementEdit"
          />
        </div>
      </q-card-section>
      <q-separator />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModel } from 'src/services/model/model.globaleState';

export default defineComponent({
  name: 'PvModel',
  components: {
    // A4Paper: require('../public/A4Paper.vue').default,
    ModelCard: require('../public/ModelCard.vue').default,
  },
  setup: () => {
    const { modelState } = useModel();

    function handleMorcellementEdit() {
      // modelState.mode = 'modelEditor';
      // modelState.titleMode = 'PV de Morcellement';
      // modelState.active[0] = 'pv';
      // modelState.active[1] = 'morcellement';
    }
    return { handleMorcellementEdit };
  },
});
</script>
