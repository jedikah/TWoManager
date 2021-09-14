<template>
  <q-editor
    :readonly="false"
    style="width: 100%; overflow: hidden"
    max-height="6cm"
    v-model="value"
    @update:modelValue="() => handleChange()"
    :dense="$q.screen.lt.md"
    ref="editorRef"
    :toolbar="[
      [
        'bold',
        'italic',
        'underline',
        'strike',
        'left',
        'center',
        'right',
        'justify',
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana',
          ],
        },
      ],
      ['token', 'fontSize'],
    ]"
    toolbar-text-color="white"
    toolbar-toggle-color="yellow-8"
    toolbar-bg="grey"
    :fonts="{
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana',
    }"
  >
    <template v-slot:token>
      <q-select
        style="max-width: 150px"
        dense
        dark
        v-model="chipLabel"
        @update:modelValue="(e) => add(e)"
        filled
        use-input
        input-debounce="0"
        :label="tokenLabel"
        :options="options"
        @filter="filterFn"
      >
      </q-select>
    </template>

    <template v-slot:fontSize>
      <q-field
        dense
        label="Police"
        filled
        label-color="white"
        style="width: 150px"
      >
        <template v-slot:control>
          <q-slider
            dense
            v-model="fontSize"
            :min="1"
            :max="7"
            label
            label-always
            @change="fontSizeChange"
          />
        </template>
      </q-field>
    </template>
  </q-editor>
  <div ref="renderComponent" v-show="false">
    <!-- start -->
    <q-chip
      dense
      v-bind="{ color: 'deep-orange', textColor: 'white' }"
      :contenteditable="false"
    >
      {{ chipLabel }}
    </q-chip>
    <!-- end -->
  </div>
</template>

<script lang="ts">
import { QEditor } from 'quasar';
import { defineComponent, ref, nextTick, computed } from 'vue';
import { SetupContext } from 'vue-demi';

import { options as initOption } from './defaultWysiwyg';

export default defineComponent({
  name: 'DefaultWywiwyg',
  props: {
    modelValue: {
      require: true,
      type: String,
      default: '',
    },
    tokenLabel: {
      default: 'tokenLabel',
    },
  },
  emits: ['onChange'],
  setup(props, { emit }: SetupContext) {
    const value = computed({
      get: () => props.modelValue,
      set: (e) => emit('update:modelValue', e),
    });
    const options = ref(initOption);
    const editorRef = ref<QEditor>(null);
    const renderComponent = ref<HTMLDivElement>(null);
    const chipLabel = ref(null);
    const fontSize = ref(2);

    function handleChange() {
      emit('onChange');
    }

    function filterFn(val, update) {
      if (val === '') {
        update(() => {
          options.value = initOption;
        });

        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = initOption.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }

    function add(val: string) {
      chipLabel.value = val;

      const edit = editorRef.value;
      nextTick(() => {
        // edit.caret.restore();
        edit.runCmd('insertHTML', renderComponent.value.innerHTML);
        edit.focus();
      });
    }

    function fontSizeChange() {
      const edit = editorRef.value;

      nextTick(() => {
        // edit.caret.restore();
        edit.runCmd('fontSize', fontSize.value.toString());
        edit.focus();
      });
    }

    return {
      fontSize,
      fontSizeChange,
      chipLabel,
      handleChange,
      value,
      options,
      filterFn,
      add,
      editorRef,
      renderComponent,
    };
  },
});
</script>
