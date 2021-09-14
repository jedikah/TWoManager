<template>
  <div>
    <div v-for="(section, index) in sections" :key="section.id">
      <double-section
        :lastIndex="sections.length - 1"
        v-if="section.name === 'DoubleSection'"
        :index="index"
        :readOnlyAll="modelState.readOnly"
        v-model:leftVal="section.vModelLeftVal"
        v-model:rightVal="section.vModelRightVal"
        @onChange="(e) => handleChange(e)"
        @onDelete="(e) => handleDelete(e)"
        @upWard="(e) => handleWard(e)"
        @downWard="(e) => handleWard(e)"
      />

      <simple-section
        :lastIndex="sections.length - 1"
        v-if="section.name === 'SimpleSection'"
        :index="index"
        :readOnlyAll="modelState.readOnly"
        v-model="section.vModel"
        @onChange="(e) => handleChange(e)"
        @onDelete="(e) => handleDelete(e)"
        @upWard="(e) => handleWard(e)"
        @downWard="(e) => handleWard(e)"
      />
    </div>

    <div class="full-width flex justify-center">
      <menuSection
        style="width: 350px"
        @clickSection="(e) => onAddSection(e)"
        v-show="!modelState.readOnly"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext, nextTick, computed } from 'vue';
import { SectionsCalque, initSection } from './modelBuilder';
import { modelState } from './model';

export default defineComponent({
  name: 'Tools',
  props: {
    modelValue: String,
  },
  components: {
    doubleSection: require('./tools/DoubleSection.vue').default,
    simpleSection: require('./tools/SimpleSection.vue').default,
    menuSection: require('./tools/SectionMenu.vue').default,
  },
  setup(props, { emit }: SetupContext) {
    const leftVal = ref('');
    const rightVal = ref('');
    const val = ref('');
    const sections = computed<SectionsCalque>({
      get: () => JSON.parse(props.modelValue),
      set: (val) => {
        // console.log({ val });
        const string = JSON.stringify(val);
        emit('update:modelValue', string);
      },
    });

    function onUpdate() {
      const string = JSON.stringify(sections.value);
      emit('update:modelValue', string);
    }

    function onAddSection(e) {
      sections.value.push(initSection(e));
      onUpdate();
    }

    function handleWard(e) {
      sections.value.splice(
        e.newIndex,
        0,
        sections.value.splice(e.oldIndex, 1)[0]
      );
      onUpdate();
    }

    function handleChange(e) {
      onUpdate();
    }

    function handleDelete(e) {
      sections.value.splice(e, 1);
      onUpdate();
    }

    return {
      handleWard,
      modelState,
      sections,
      onAddSection,
      handleChange,
      leftVal,
      rightVal,
      handleDelete,
      val,
    };
  },
});
</script>

<style lang="scss" scoped>
.border-add-card {
  border: 1px solid $primary !important;
  margin: 5px 0;
}
</style>
