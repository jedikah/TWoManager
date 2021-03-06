<template>
  <q-card>
    <q-card-section>
      <q-card-section>
        <div class="text-overline">Liste des modeles</div>
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
            v-on:emitClick_morcellement="handleOpenMorcellement"
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
  name: 'ModelListView',
  components: {
    ModelCard: require('../public/ModelCard.vue').default,
  },
  setup: () => {
    const morcellement = useModel('morcellement');

    function handleOpenMorcellement() {
      //
    }

    return { handleOpenMorcellement };
  },
});
</script>
