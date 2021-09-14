<template>
  <div style="margin: 25px 0" class="flex justify-center">
    <q-btn
      dense
      fab
      round
      color="primary"
      icon="add"
      @click="nextMorph"
      v-morph:btn:200.resize="morphGroupModel"
    >
      <q-tooltip> Cliquer ici pour afficher le menu de section </q-tooltip>
    </q-btn>

    <div v-morph:card:200.resize="morphGroupModel" style="contain: content">
      <q-card
        flat
        bordered
        style="border: 1px solid #b5b5b5; width: 350px"
        class="bg-grey-2"
      >
        <q-card-section class="flex wrap">
          <q-card
            flat
            bordered
            class="no-padding section cursor-pointer"
            style="margin: 5px"
            @click="() => clickSection('DoubleSection')"
          >
            <q-card-section class="no-padding text-center">
              Double section
            </q-card-section>
            <double-section
              :loading="true"
              animation="pulse"
              style="height: 50px; width: 150px; font-size: 200%"
            />
          </q-card>

          <q-card
            flat
            bordered
            class="no-padding section cursor-pointer"
            @click="() => clickSection('SimpleSection')"
          >
            <q-card-section class="no-padding text-center">
              Simple section
            </q-card-section>
            <simple-section
              :loading="true"
              animation="pulse"
              style="height: 50px; width: 150px; font-size: 200%"
            />
          </q-card>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            dense
            fab
            round
            color="grey-6"
            icon="close"
            @click="nextMorph"
          />
        </q-card-actions>
      </q-card>

      <q-tooltip> Ajouter une section </q-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SetupContext } from 'vue-demi';
import { Sections } from '../modelBuilder';

export default defineComponent({
  name: 'SelectionMenu',
  components: {
    doubleSection: require('./DoubleSection.vue').default,
    simpleSection: require('./SimpleSection.vue').default,
  },
  setup(_, { emit }: SetupContext) {
    const morphGroupModel = ref('btn');
    const nextMorphStep = {
      btn: 'card',
      card: 'btn',
    };

    function nextMorph() {
      morphGroupModel.value = nextMorphStep[morphGroupModel.value];
    }

    function clickSection(e: Sections) {
      emit('clickSection', e);
    }
    return { clickSection, morphGroupModel, nextMorph };
  },
});
</script>

<style lang="scss" scoped>
.section {
  opacity: 0.5;
  transition: all ease 500ms;
}

.section:hover {
  opacity: 1;
  box-shadow: 0 0 5px rgb(0, 166, 255);
  border: 1px solid rgb(0, 166, 255);
}
</style>
